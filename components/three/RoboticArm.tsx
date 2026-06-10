"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const STEEL = "#C8C8CE";
const STEEL_DARK = "#8A8A92";
const HEAT = "#FF4500";

// Hanging rest pose — arm rotated 90° down from vertical, hanging
// beside the base like a real industrial arm at standby.
const REST = {
  shoulder: 0.2, 
  elbow: -1.2,  
  wristRoll: 0,
  wristPitch: 0,
  gripper: 1,
};

const RANGE = {
  shoulder: 0.9, // sweep amplitude (rad)
  elbow: -1.2,
  wristRoll: Math.PI * 2,
  wristPitch: 0.5,
  gripper: 0.08,
};

// ─── Materials ───────────────────────────────────────────────────────
function SteelMaterial({ roughness = 0.32 }: { roughness?: number }) {
  return (
    <meshStandardMaterial
      color={STEEL}
      metalness={0.92}
      roughness={roughness}
      envMapIntensity={1.1}
    />
  );
}

function JointCap({ radius = 0.32, height = 0.32 }: { radius?: number; height?: number }) {
  return (
    <mesh castShadow>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshStandardMaterial
        color={STEEL_DARK}
        metalness={0.95}
        roughness={0.45}
        envMapIntensity={0.9}
      />
    </mesh>
  );
}

function HeatMotor({ radius = 0.22, height = 0.18 }: { radius?: number; height?: number }) {
  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, height, 24]} />
      <meshStandardMaterial
        color={HEAT}
        metalness={0.5}
        roughness={0.35}
        emissive={HEAT}
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

// ─── Arm geometry ────────────────────────────────────────────────────
function ArmRig({
  calibratingRef,
  calibCountRef,
  lastSeenCountRef,
  localTRef,
}: {
  calibratingRef: React.MutableRefObject<boolean>;
  calibCountRef: React.MutableRefObject<number>;
  lastSeenCountRef: React.MutableRefObject<number>;
  localTRef: React.MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null); // upper arm group → rotation.z = shoulder pitch
  const elbow = useRef<THREE.Group>(null);    // forearm group → rotation.z = elbow
  const wristRoll = useRef<THREE.Group>(null); // wrist roll → rotation.y
  const wristPitch = useRef<THREE.Group>(null); // wrist pitch → rotation.z
  const leftFinger = useRef<THREE.Group>(null); // x position = open/close
  const rightFinger = useRef<THREE.Group>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const t = useRef({ x: 0, y: 0 });

  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // helpers — smoothstep-ish easing for joint sweep
  const ease = (x: number) => x * x * (3 - 2 * x);
  const sweep = (phase: number) => {
    // returns -1 → +1 → -1 over phase 0..1
    if (phase <= 0 || phase >= 1) return 0;
    return Math.sin(phase * Math.PI * 2);
  };

  useFrame((state, delta) => {
    if (!root.current) return;

    if (calibratingRef.current) {
      // every new click bumps calibCount — reset the local clock to start
      // the sequence from the beginning.
      if (calibCountRef.current !== lastSeenCountRef.current) {
        lastSeenCountRef.current = calibCountRef.current;
        localTRef.current = 0;
      }
      localTRef.current = Math.min(6.5, localTRef.current + delta);
      const T = localTRef.current / 6.0;

      // define phases (each takes ~0.15 of the total, last 0.20 returns to rest)
      // shoulder: 0.00 - 0.15, elbow: 0.15 - 0.30, wristRoll: 0.30 - 0.50,
      // wristPitch: 0.50 - 0.65, gripper: 0.65 - 0.80, return: 0.80 - 1.00
      const phase = (start: number, len: number) => {
        const p = (T - start) / len;
        return Math.max(0, Math.min(1, p));
      };

      const pShoulder = phase(0.00, 0.15);
      const pElbow = phase(0.15, 0.15);
      const pRoll = phase(0.30, 0.20);
      const pPitch = phase(0.50, 0.15);
      const pGripper = phase(0.65, 0.15);
      const pReturn = phase(0.80, 0.20);

      if (shoulder.current) {
        shoulder.current.rotation.z = REST.shoulder + sweep(pShoulder) * RANGE.shoulder;
      }
      if (elbow.current) {
        elbow.current.rotation.z = REST.elbow + sweep(pElbow) * RANGE.elbow;
      }
      if (wristRoll.current) {
        wristRoll.current.rotation.y = sweep(pRoll) * RANGE.wristRoll;
      }
      if (wristPitch.current) {
        wristPitch.current.rotation.z = sweep(pPitch) * RANGE.wristPitch;
      }
      const gripperDelta = sweep(pGripper) * RANGE.gripper;
      if (leftFinger.current) leftFinger.current.position.x = -0.08 - gripperDelta;
      if (rightFinger.current) rightFinger.current.position.x = 0.08 + gripperDelta;

      // smoothly return to rest in the last 20%
      const returnBlend = ease(pReturn);
      if (shoulder.current) shoulder.current.rotation.z = THREE.MathUtils.lerp(shoulder.current.rotation.z, REST.shoulder, returnBlend * 0.15);
      if (elbow.current) elbow.current.rotation.z = THREE.MathUtils.lerp(elbow.current.rotation.z, REST.elbow, returnBlend * 0.15);
      if (wristRoll.current) wristRoll.current.rotation.y = THREE.MathUtils.lerp(wristRoll.current.rotation.y, REST.wristRoll, returnBlend * 0.15);
      if (wristPitch.current) wristPitch.current.rotation.z = THREE.MathUtils.lerp(wristPitch.current.rotation.z, REST.wristPitch, returnBlend * 0.15);
      const gripClose = THREE.MathUtils.lerp(gripperDelta, 0, returnBlend * 0.15);
      if (leftFinger.current) leftFinger.current.position.x = -0.08 - gripClose;
      if (rightFinger.current) rightFinger.current.position.x = 0.08 + gripClose;

      // lock root in place during calibration
      root.current.rotation.y = 0;
      root.current.rotation.x = -0.02;
    } else {
      // mouse-tracking mode
      const targetX = THREE.MathUtils.clamp(mouse.current.x * 0.25, -0.35, 0.35);
      const targetY = THREE.MathUtils.clamp(mouse.current.y * 0.15, -0.25, 0.25);
      t.current.x += (targetX - t.current.x) * 0.05;
      t.current.y += (targetY - t.current.y) * 0.05;
      const time = state.clock.getElapsedTime();
      const idle = Math.sin(time * 0.32) * 0.04;
      root.current.rotation.y = t.current.x + idle * 0.5;
      root.current.rotation.x = t.current.y * 0.5 - 0.02;

      // settle joints to rest
      if (shoulder.current) shoulder.current.rotation.z = REST.shoulder;
      if (elbow.current) elbow.current.rotation.z = REST.elbow;
      if (wristRoll.current) wristRoll.current.rotation.y = REST.wristRoll;
      if (wristPitch.current) wristPitch.current.rotation.z = REST.wristPitch;
      if (leftFinger.current) leftFinger.current.position.x = -0.08;
      if (rightFinger.current) rightFinger.current.position.x = 0.08;
    }
  });

  return (
    <group ref={root} position={[0, -0.75, 0]}>
      {/* ── Base plate ────────────────────────────── */}
      <group position={[0, 0, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.8, 0.12, 48]} />
          <SteelMaterial roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.5, 0.58, 0.1, 36]} />
          <SteelMaterial />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.62, 0.04, Math.sin(a) * 0.62]}>
              <cylinderGeometry args={[0.025, 0.025, 0.05, 12]} />
              <meshStandardMaterial color={STEEL_DARK} metalness={0.9} roughness={0.4} />
            </mesh>
          );
        })}
      </group>

      {/* ── Shoulder yaw motor ────────────────────── */}
      <group position={[0, 0.2, 0]}>
        <JointCap radius={0.24} height={0.3} />
        <HeatMotor radius={0.17} height={0.32} />
        {/* shoulder pitch pivot */}
        <group position={[0, 0.22, 0]}>
          <JointCap radius={0.2} height={0.28} />
          <HeatMotor radius={0.14} height={0.3} />

          {/* Upper arm — controlled by `shoulder` ref */}
          <group ref={shoulder} rotation={[0, 0, REST.shoulder]}>
            <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
              <boxGeometry args={[0.2, 0.85, 0.2]} />
              <SteelMaterial />
            </mesh>
            <mesh position={[0.11, 0.42, 0]}>
              <boxGeometry args={[0.014, 0.7, 0.22]} />
              <meshStandardMaterial color={HEAT} emissive={HEAT} emissiveIntensity={0.4} />
            </mesh>

            {/* Elbow pivot */}
            <group position={[0, 0.85, 0]}>
              <JointCap radius={0.18} height={0.24} />
              <HeatMotor radius={0.12} height={0.26} />

              {/* Forearm — controlled by `elbow` ref */}
              <group ref={elbow} rotation={[0, 0, REST.elbow]}>
                <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
                  <boxGeometry args={[0.16, 0.7, 0.16]} />
                  <SteelMaterial />
                </mesh>
                <mesh position={[-0.09, 0.35, 0]}>
                  <boxGeometry args={[0.014, 0.56, 0.18]} />
                  <meshStandardMaterial color={HEAT} emissive={HEAT} emissiveIntensity={0.4} />
                </mesh>

                {/* Wrist roll joint */}
                <group ref={wristRoll} position={[0, 0.7, 0]}>
                  <JointCap radius={0.15} height={0.2} />
                  <HeatMotor radius={0.1} height={0.22} />

                  {/* Wrist pitch */}
                  <group ref={wristPitch} position={[0, 0.12, 0]}>
                    <JointCap radius={0.12} height={0.16} />

                    {/* Wrist link + gripper base */}
                    <group position={[0, 0.2, 0]}>
                      <mesh castShadow>
                        <boxGeometry args={[0.22, 0.13, 0.25]} />
                        <SteelMaterial />
                      </mesh>

                      {/* Gripper fingers — each side has its own ref for open/close */}
                      <group position={[0, -0.12, 0]}>
                        <group ref={leftFinger} position={[-0.08, -0.1, 0]}>
                          <mesh castShadow>
                            <boxGeometry args={[0.05, 0.2, 0.1]} />
                            <SteelMaterial roughness={0.4} />
                          </mesh>
                          <mesh position={[0, 0.07, 0]}>
                            <cylinderGeometry args={[0.012, 0.012, 0.05, 12]} />
                            <meshStandardMaterial color={HEAT} emissive={HEAT} emissiveIntensity={0.9} />
                          </mesh>
                        </group>
                        <group ref={rightFinger} position={[0.08, -0.1, 0]}>
                          <mesh castShadow>
                            <boxGeometry args={[0.05, 0.2, 0.1]} />
                            <SteelMaterial roughness={0.4} />
                          </mesh>
                          <mesh position={[0, 0.07, 0]}>
                            <cylinderGeometry args={[0.012, 0.012, 0.05, 12]} />
                            <meshStandardMaterial color={HEAT} emissive={HEAT} emissiveIntensity={0.9} />
                          </mesh>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Decorative bracket */}
      <mesh position={[0.68, 0.08, 0]} castShadow>
        <boxGeometry args={[0.15, 0.18, 0.25]} />
        <SteelMaterial roughness={0.45} />
      </mesh>
      <mesh position={[0.68, 0.22, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08, 16]} />
        <meshStandardMaterial color={HEAT} emissive={HEAT} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export function RoboticArm({ className = "" }: { className?: string }) {
  // counter, not boolean — every click increments and restarts the sequence
  const [calibCount, setCalibCount] = useState(0);
  const calibrating = calibCount > 0;

  // hold the latest count in a ref so useFrame can detect a fresh click
  // and reset its local elapsed-time clock.
  const calibCountRef = useRef(0);
  const lastSeenCountRef = useRef(0);
  const localTRef = useRef(0); // seconds elapsed in the current calibration
  const calibratingRef = useRef(false);

  // every time `calibCount` changes, the 6.5s end timer reschedules.
  useEffect(() => {
    calibCountRef.current = calibCount;
    if (calibCount === 0) {
      calibratingRef.current = false;
      return;
    }
    calibratingRef.current = true;
    const t = setTimeout(() => setCalibCount(0), 6500);
    return () => clearTimeout(t);
  }, [calibCount]);

  return (
    <div
      className={`group relative h-full w-full cursor-pointer select-none ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setCalibCount((c) => c + 1);
      }}
      aria-label="Click to run arm calibration sequence"
    >
      <Canvas
        camera={{ position: [3.4, 0.6, 5.4], fov: 30 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.22} />
          <directionalLight position={[5, 6, 4]} intensity={1.0} color="#FFFFFF" />
          <directionalLight position={[-4, 2, -3]} intensity={0.45} color={HEAT} />
          <directionalLight position={[0, -3, 0]} intensity={0.25} color="#FFFFFF" />
          <Environment preset="warehouse" />
          <ArmRig
            calibratingRef={calibratingRef}
            calibCountRef={calibCountRef}
            lastSeenCountRef={lastSeenCountRef}
            localTRef={localTRef}
          />
        </Suspense>
      </Canvas>

      {/* transparent click-capture layer above the canvas */}
      <button
        type="button"
        aria-label="Run calibration sequence"
        data-lenis-prevent="pointer"
        onClick={() => {
          // every click starts a fresh sequence — even mid-calibration
          setCalibCount((c) => c + 1);
        }}
        className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
        style={{ WebkitTapHighlightColor: "transparent", background: "transparent" }}
      />

      {/* Hint label — fades out while calibrating */}
      <div
        className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] transition-opacity duration-500 ${
          calibrating ? "text-heat opacity-100" : "text-muted opacity-70 group-hover:opacity-100"
        }`}
      >
        {calibrating ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-heat animate-pulse" />
            calibrating joints …
          </span>
        ) : (
          "click to calibrate"
        )}
      </div>
    </div>
  );
}
