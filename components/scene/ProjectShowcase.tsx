import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  project: Project;
  flip?: boolean;
};

export function ProjectShowcase({ project, flip = false }: Props) {
  return (
    <article
      className={`grid items-start gap-8 md:gap-16 ${
        flip ? "md:grid-flow-col-dense" : ""
      } md:grid-cols-12`}
    >
      {/* Index / title column */}
      <Reveal
        as="div"
        className={`${flip ? "md:col-span-5 md:col-start-8" : "md:col-span-5"}`}
        delay={0.05}
      >
        <div className="md:sticky md:top-32">
          <div className="mb-3 flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:mb-4">
            <span className="text-heat">{project.index}</span>
            <span>//</span>
            <span>{project.category}</span>
          </div>
          <h3 className="font-display text-balance text-3xl font-medium leading-[0.95] text-foreground md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-foreground/70 md:mt-5 md:text-lg">
            {project.blurb}
          </p>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-heat pb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-heat transition-colors hover:text-foreground md:mt-8"
            >
              open project
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          )}
          {project.hrefLabel && (
            <div className="mt-2 font-mono text-[10px] tracking-wider text-muted">
              {project.hrefLabel}
            </div>
          )}
        </div>
      </Reveal>

      {/* Detail column */}
      <Reveal
        as="div"
        className={`${flip ? "md:col-span-7 md:col-start-1 md:row-start-1" : "md:col-span-7"} space-y-6 md:space-y-8`}
        delay={0.18}
      >
        <p className="text-pretty text-base leading-relaxed text-foreground/80 md:text-lg">
          {project.description}
        </p>

        <dl className="grid grid-cols-3 gap-px border border-border bg-border">
          {project.result.map((r) => (
            <div key={r.label} className="bg-surface-2 p-4 md:p-6">
              <div className="font-display text-2xl font-medium text-foreground md:text-4xl">
                {r.value}
              </div>
              <div className="mt-1.5 font-mono text-[9px] uppercase leading-snug tracking-[0.2em] text-muted md:mt-2 md:text-[10px] md:tracking-[0.25em]">
                {r.label}
              </div>
            </div>
          ))}
        </dl>

        <div>
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            stack
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground/85"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </article>
  );
}
