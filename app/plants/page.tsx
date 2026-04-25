import Link from 'next/link';
import { plants } from '@aquascape-studio/botany';

/**
 * Plants catalog — SSR list of every species from @aquascape/data.
 *
 * Bilingual display (scientific + English + Chinese common name). Phase 1
 * has no client-side filtering; that arrives with the search input.
 */
export default function PlantsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="mb-8 flex items-baseline justify-between">
        <h1 className="font-serif text-3xl text-bone-100">Plants</h1>
        <Link href="/" className="text-sm text-bone-300 hover:text-bone-100">
          Home
        </Link>
      </header>

      <p className="mb-6 text-sm text-muted-foreground">
        {plants.length} species. Tap any entry to see care notes, envelopes,
        and growth coefficients.
      </p>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {plants.map((p) => {
          const english = p.commonNames.en[0] ?? p.scientificName;
          const chinese = p.commonNames.zh[0] ?? '';
          return (
            <li key={p.id}>
              <div className="group flex flex-col gap-1 rounded-md border border-border/40 bg-surface p-4 transition-colors duration-transition ease-transition hover:bg-surface-hover">
                <span className="font-serif text-lg text-bone-100">
                  {english}
                </span>
                <span className="text-sm text-muted-foreground">
                  {p.scientificName}
                  {chinese ? ` · ${chinese}` : ''}
                </span>
                <span className="mt-2 text-xs uppercase tracking-wide text-moss-300">
                  {p.difficulty.label} · {p.growthForm}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
