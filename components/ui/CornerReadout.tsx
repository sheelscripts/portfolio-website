"use client";

import { useEffect, useState } from "react";
import { contact } from "@/lib/data";

// Fixed corner widget — live UTC + coordinates.
// Reads scroll position and prints "MISSION TIME" + page progress.

export function CornerReadout() {
  const [now, setNow] = useState<string>("00:00:00");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setNow(`${hh}:${mm}:${ss}`);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    update();
    const t = setInterval(update, 1000);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      clearInterval(t);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed left-4 top-16 z-30 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:block">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-heat animate-pulse" />
          <span>UTC {now}</span>
        </div>
        <div className="mt-1">{contact.coords.lat}</div>
        <div>{contact.coords.lng}</div>
      </div>
      <div className="pointer-events-none fixed bottom-4 right-4 z-30 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:block">
        <div className="text-right">MISSION {Math.round(progress * 100).toString().padStart(2, "0")}%</div>
        <div className="mt-1.5 h-px w-24 bg-border">
          <div
            className="h-px bg-heat transition-[width] duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
