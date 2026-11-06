import React from 'react';

/** Hukuki metin sayfası düzeni (KVKK, çerez politikası) */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <article className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[28px] p-6 md:p-10 space-y-6 text-sm leading-relaxed text-armoyu-text [&_h2]:text-base [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-armoyu-primary [&_a]:font-bold">
        <header className="space-y-1">
          <h1 className="text-2xl font-black uppercase tracking-tight">{title}</h1>
          <p className="text-xs text-armoyu-text-muted">Son güncelleme: {updated}</p>
        </header>
        {children}
      </article>
    </main>
  );
}
