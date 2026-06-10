import { SceneHeader } from "@/components/ui/SceneHeader";
import { ProjectShowcase } from "@/components/scene/ProjectShowcase";
import { projects } from "@/lib/data";

export function Work() {
  return (
    <section className="scene relative">
      <div className="mx-auto max-w-[1400px]">
        <SceneHeader
          index="05"
          eyebrow="Work"
          title="Systems I&apos;ve shipped — from the bench to the browser."
          id="work"
        />

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectShowcase key={p.name} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
