/** Yayındaki sürümleri takip için: web, @armoyu/ui ve @armoyu/core (next.config derlemede doldurur) */
export function VersionInfo() {
  return (
    <p className="py-6 text-center text-[10px] font-bold uppercase tracking-widest text-armoyu-text-muted opacity-60">
      Web v{process.env.NEXT_PUBLIC_WEB_VERSION} · UI v{process.env.NEXT_PUBLIC_UI_VERSION} · Core v{process.env.NEXT_PUBLIC_CORE_VERSION}
    </p>
  );
}
