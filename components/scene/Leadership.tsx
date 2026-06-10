import { SceneHeader } from "@/components/ui/SceneHeader";
import { Reveal } from "@/components/ui/Reveal";
import { leadership } from "@/lib/data";

export function Leadership() {
  return (
    <section className="scene relative">
      <div className="mx-auto max-w-[1400px]">
        <SceneHeader
          index="06"
          eyebrow="Leadership"
          title="Off the bench — building the rooms I want to be in."
          id="leadership"
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {leadership.map((role, i) => (
            <Reveal
              key={role.org}
              as="article"
              delay={i * 0.1}
              className="group relative border border-border bg-surface p-8 transition-colors hover:border-heat md:p-10"
            >
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                <span className="text-heat">06.{String(i + 1).padStart(2, "0")}</span>
                <span>//</span>
                <span>{role.period}</span>
              </div>
              <h3 className="font-display text-2xl font-medium leading-tight text-foreground md:text-3xl">
                {role.role}
              </h3>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-steel">
                {role.href ? (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border-b border-border pb-0.5 transition-colors hover:border-heat hover:text-heat"
                  >
                    {role.org}
                    <span className="text-heat">↗</span>
                  </a>
                ) : (
                  role.org
                )}
              </div>
              <p className="mt-6 text-pretty text-base leading-relaxed text-foreground/70">
                {role.detail}
              </p>
              {role.meta && (
                <div className="mt-6 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-heat">
                  {role.meta}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
