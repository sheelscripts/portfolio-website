"use client";

import { motion, useReducedMotion } from "motion/react";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Reveal } from "@/components/ui/Reveal";
import { timeline, type TimelineEntry } from "@/lib/data";

const dotColor: Record<TimelineEntry["kind"], string> = {
  milestone: "bg-heat",
  role: "bg-heat",
  project: "bg-foreground",
  award: "bg-heat",
};

const kindLabel: Record<TimelineEntry["kind"], string> = {
  milestone: "origin",
  role: "role",
  project: "ship",
  award: "award",
};

export function Timeline() {
  const reduce = useReducedMotion();
  return (
    <section className="scene relative">
      <div className="mx-auto max-w-[1400px]">
        <SceneHeader
          index="03"
          eyebrow="Timeline"
          title="Field log — 2023 to present."
          id="timeline"
        />

        <div className="relative">
          {/* rail */}
          <div className="absolute left-3 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          <ol className="space-y-12 md:space-y-20">
            {timeline.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={entry.date + entry.title} className="relative">
                  {/* dot on rail */}
                  <motion.span
                    className={`absolute left-3 top-2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full ${dotColor[entry.kind]} md:left-1/2`}
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={reduce ? undefined : { scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div
                    className={`grid gap-4 pl-10 md:grid-cols-2 md:gap-12 md:pl-0 ${
                      isLeft ? "md:[&>div:first-child]:text-right md:[&>div:first-child]:pr-10" : "md:[&>div:last-child]:pl-10"
                    }`}
                  >
                    <Reveal
                      as="div"
                      className={isLeft ? "" : "md:order-2"}
                      delay={0.05}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                        <span className="text-heat">{entry.date}</span>
                        <span className="mx-2">·</span>
                        <span>{kindLabel[entry.kind]}</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-foreground md:text-3xl">
                        {entry.title}
                      </h3>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-steel">
                        {entry.href ? (
                          <a
                            href={entry.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 border-b border-border pb-0.5 transition-colors hover:border-heat hover:text-heat"
                          >
                            {entry.org}
                            <span className="text-heat">↗</span>
                          </a>
                        ) : (
                          entry.org
                        )}
                      </div>
                    </Reveal>

                    <Reveal
                      as="div"
                      className={isLeft ? "md:order-2" : ""}
                      delay={0.18}
                    >
                      <p className="text-pretty text-base leading-relaxed text-foreground/70 md:text-lg">
                        {entry.detail}
                      </p>
                      {entry.meta && (
                        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-heat">
                          {entry.meta}
                        </div>
                      )}
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
