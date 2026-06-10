type SceneHeaderProps = {
  index: string; // e.g. "02"
  eyebrow: string; // e.g. "IDENTITY"
  title: string;
  id?: string; // for scroll target
};

// CAD-style scene header: `02 // IDENTITY ━━━━━━━━━━━━━ TITLE`
export function SceneHeader({ index, eyebrow, title, id }: SceneHeaderProps) {
  return (
    <div id={id} className="mb-12 md:mb-20">
      <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
        <span className="text-heat">{index}</span>
        <span>//</span>
        <span>{eyebrow}</span>
        <span className="ml-2 inline-block h-px flex-1 bg-border" />
      </div>
      <h2 className="font-display text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[0.95] text-foreground">
        {title}
      </h2>
    </div>
  );
}
