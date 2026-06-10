import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Monogram } from "@/components/brand/Monogram";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/BrandIcons";
import { contact } from "@/lib/data";

export function Contact() {
  return (
    <section
      id="contact"
      className="scene relative border-t border-border"
    >
      <div className="mx-auto max-w-[1400px]">
        <SceneHeader
          index="08"
          eyebrow="Contact"
          title="Transmission ready — send a signal."
        />

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal as="div" className="md:col-span-7" delay={0.05}>
            <p className="font-narrative text-2xl italic leading-relaxed text-foreground/90 md:text-3xl">
              If you&apos;re building something where silicon and software meet —
              a robotics startup, an embedded product team, a research lab that
              ships — I&apos;d love to hear from you.
            </p>

            <ul className="mt-10 space-y-3 font-mono text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-center gap-3 border-b border-border pb-1.5 text-foreground transition-colors hover:border-heat hover:text-heat"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {contact.email}
                  <ArrowUpRight className="h-3 w-3 -translate-y-px opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="group inline-flex items-center gap-3 border-b border-border pb-1.5 text-foreground transition-colors hover:border-heat hover:text-heat"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-border pb-1.5 text-foreground transition-colors hover:border-heat hover:text-heat"
                >
                  <GithubIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  github.com/{contact.githubHandle}
                  <ArrowUpRight className="h-3 w-3 -translate-y-px opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-border pb-1.5 text-foreground transition-colors hover:border-heat hover:text-heat"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  linkedin.com/in/{contact.linkedinHandle}
                  <ArrowUpRight className="h-3 w-3 -translate-y-px opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href={contact.x}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-border pb-1.5 text-foreground transition-colors hover:border-heat hover:text-heat"
                >
                  <XIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  x.com/{contact.xHandle}
                  <ArrowUpRight className="h-3 w-3 -translate-y-px opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal as="div" className="md:col-span-5" delay={0.2}>
            <div className="border border-border bg-surface-2 p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                <span className="text-heat">08.A</span>
                <span>//</span>
                <span>availability</span>
              </div>
              <div className="font-display text-4xl leading-tight text-foreground md:text-5xl">
                Open
              </div>
              <p className="mt-2 text-pretty text-sm text-foreground/70">
                Summer 2026 internships · full-time roles from graduation.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-px bg-border">
                <div className="bg-surface-2 p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">role</div>
                  <div className="mt-1 text-sm text-foreground/90">Embedded / Robotics</div>
                </div>
                <div className="bg-surface-2 p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">or</div>
                  <div className="mt-1 text-sm text-foreground/90">Full-stack Hardware-adjacent</div>
                </div>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="mt-8 block w-full border border-heat bg-heat px-5 py-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-background transition-colors hover:bg-foreground hover:text-background"
              >
                open email client →
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* footer strip */}
      <div className="mx-auto mt-24 max-w-[1400px] border-t border-border pt-6">
        <div className="flex flex-col items-start justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Monogram className="h-5 w-5 text-foreground" />
            <span>© 2026 · {contact.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>v0.1 · built in next.js 16</span>
            <span className="text-heat">// eof</span>
          </div>
        </div>
      </div>
    </section>
  );
}
