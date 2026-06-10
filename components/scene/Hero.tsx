"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { contact } from "@/lib/data";
import { RoboticArmFallback } from "@/components/three/RoboticArmFallback";

const RoboticArm = dynamic(
  () => import("@/components/three/RoboticArm").then((m) => m.RoboticArm),
  { ssr: false, loading: () => <RoboticArmFallback className="h-full w-full" /> }
);

export function Hero() {
  const reduce = useReducedMotion();
  const titleText = contact.name.toUpperCase();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-20">
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] md:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-steel) 1px, transparent 1px), linear-gradient(90deg, var(--color-steel) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* 3D arm — centered within the right region of the hero */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[55%] md:flex md:items-center md:justify-center md:pr-[2vw]">
        <div className="pointer-events-auto relative h-[min(82vh,720px)] w-full">
          <RoboticArm className="h-full w-full" />
        </div>
      </div>
      {/* mobile: small SVG fallback in the upper-right, behind the title */}
      <div className="pointer-events-none absolute right-2 top-20 h-40 w-24 opacity-25 md:hidden">
        <RoboticArmFallback className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-5 pb-12 md:justify-center md:px-8 md:pb-0 md:pr-[44%]">
        {/* eyebrow */}
        <motion.div
          className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:mb-6 md:gap-3 md:text-[11px]"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-heat" />
          <span className="text-heat">01</span>
          <span>//</span>
          <span>Title Card</span>
        </motion.div>

        {/* massive lockup — smaller min on mobile so it fits one line on 390px */}
        <h1 className="font-display text-balance text-[clamp(2rem,10vw,7rem)] font-medium leading-[0.9] tracking-[-0.03em] text-foreground whitespace-nowrap">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: 60 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {titleText}
          </motion.span>
        </h1>

        {/* tagline */}
        <motion.p
          className="mt-6 max-w-xl text-balance font-narrative text-xl italic leading-snug text-foreground/90 md:mt-8 md:text-3xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {contact.role}
          <span className="text-muted"> {contact.tagline}</span>
        </motion.p>

        {/* meta row */}
        <motion.div
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:mt-12 md:grid-cols-3 md:gap-x-8 md:text-[11px]"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div>
            <div className="text-foreground/40">loc</div>
            <div className="text-foreground/80">{contact.location}</div>
          </div>
          <div>
            <div className="text-foreground/40">status</div>
            <div className="flex items-center gap-1.5 text-foreground/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-heat animate-pulse" />
              open · summer 2026
            </div>
          </div>
          <div>
            <div className="text-foreground/40">degree</div>
            <div className="text-foreground/80">B.Tech · &apos;27</div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:mt-16"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <span>scroll to begin</span>
          <span className="relative inline-block h-px w-12 bg-border">
            <motion.span
              className="absolute inset-y-0 left-0 h-px bg-heat"
              initial={{ width: 0 }}
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
