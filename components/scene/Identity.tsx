import { SceneHeader } from "@/components/ui/SceneHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Identity() {
  return (
    <section className="scene relative">
      <div className="mx-auto max-w-[1400px]">
        <SceneHeader
          index="02"
          eyebrow="Identity"
          title="The same engineer who solders the board writes the API that talks to it."
          id="identity"
        />

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal as="div" className="md:col-span-7" delay={0.1}>
            <p className="font-narrative text-2xl italic leading-relaxed text-foreground/90 md:text-3xl">
              I build the bridge between code and matter — sensors, silicon, and
              software, held at the same seam.
            </p>
            <p className="mt-8 max-w-prose text-pretty text-base leading-relaxed text-foreground/70 md:text-lg">
              Robotics and embedded systems engineer with hands-on experience in
              robotic arm design, sensor fusion, real-time control pipelines, and
              autonomous-systems firmware. Equally at home shipping a clinical
              triage dashboard, a real-time AQI rover, or a 2-layer STM32 board
              from schematic to validated bring-up.
            </p>
            <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-foreground/70 md:text-lg">
              The two worlds aren&apos;t separate. Every system I build is full-stack
              by definition: sensor → firmware → API → interface → human.
            </p>
          </Reveal>

          <Reveal as="div" className="md:col-span-5" delay={0.25}>
            <div className="border border-border bg-surface-2 p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                <span className="text-heat">02.A</span>
                <span>//</span>
                <span>operational spec</span>
              </div>
              <dl className="space-y-3 font-mono text-sm">
                {[
                  ["role", "engineer, builder"],
                  ["scope", "sensor → UI"],
                  ["stack", "robotic / web"],
                  ["base", "delhi, india"],
                  ["available", "summer ’26"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-3">
                    <dt className="w-24 text-muted">{k}</dt>
                    <dd className="text-foreground/90">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                v0.1 · last updated 2026
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
