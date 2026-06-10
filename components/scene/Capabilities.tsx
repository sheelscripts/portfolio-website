import { SceneHeader } from "@/components/ui/SceneHeader";
import { Reveal } from "@/components/ui/Reveal";
import { skills } from "@/lib/data";

export function Capabilities() {
  return (
    <section className="scene relative">
      <div className="mx-auto max-w-[1400px]">
        <SceneHeader
          index="04"
          eyebrow="Capabilities"
          title="Operating spec — what I bring to the bench."
          id="capabilities"
        />

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, gi) => (
            <Reveal
              key={group.domain}
              as="div"
              className="bg-surface p-6 md:p-8"
              delay={gi * 0.08}
            >
              <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                <span className="text-heat">04.{String(gi + 1).padStart(2, "0")}</span>
                <span>//</span>
                <span className="text-foreground/80">{group.domain}</span>
              </div>
              <ul className="space-y-2.5 font-mono text-sm text-foreground/85">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-3 flex-none bg-border" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
