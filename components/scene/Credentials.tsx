import { SceneHeader } from "@/components/ui/SceneHeader";
import { Reveal } from "@/components/ui/Reveal";
import { certifications, education } from "@/lib/data";

export function Credentials() {
  return (
    <section className="scene relative">
      <div className="mx-auto max-w-[1400px]">
        <SceneHeader
          index="07"
          eyebrow="Credentials"
          title="Formal specs — degree, course, and certifications."
          id="credentials"
        />

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Education */}
          <Reveal as="div" className="md:col-span-7" delay={0.05}>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              <span className="text-heat">07.01</span>
              <span>//</span>
              <span>Education</span>
            </div>
            <h3 className="font-display text-3xl font-medium leading-tight text-foreground md:text-4xl">
              {education.degree}
            </h3>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-steel">
              {education.school} · {education.period}
            </div>
            <div className="mt-8">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Relevant coursework
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <li
                    key={c}
                    className="border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground/85"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal as="div" className="md:col-span-5" delay={0.2}>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              <span className="text-heat">07.02</span>
              <span>//</span>
              <span>Certifications</span>
            </div>
            <ul className="space-y-px border border-border bg-border">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-center justify-between bg-surface-2 px-5 py-4">
                  <div>
                    <div className="font-display text-lg text-foreground">{c.name}</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      {c.org}
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px] uppercase tracking-[0.25em] text-heat">
                    {c.period}
                    {c.status === "ongoing" && (
                      <div className="mt-1 flex items-center justify-end gap-1.5 text-muted">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-heat animate-pulse" />
                        live
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
