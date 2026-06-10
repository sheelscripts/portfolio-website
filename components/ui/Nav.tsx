"use client";

import { useEffect, useState } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { contact } from "@/lib/data";

const links = [
  { href: "#identity", label: "Identity" },
  { href: "#timeline", label: "Timeline" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-foreground hover-heat">
          <Monogram className="h-7 w-7 text-foreground" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Sheelendra</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted hover-heat"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`mailto:${contact.email}`}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted hover-heat"
          >
            {contact.email}
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden"
        >
          <span className="block h-px w-7 bg-foreground transition-transform" style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }} />
          <span className="mt-1.5 block h-px w-7 bg-foreground transition-opacity" style={{ opacity: open ? 0 : 1 }} />
          <span className="mt-1.5 block h-px w-7 bg-foreground transition-transform" style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-mono text-[12px] uppercase tracking-[0.25em] text-foreground hover-heat"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <a href={`mailto:${contact.email}`} className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                {contact.email}
              </a>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
