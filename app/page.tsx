import Link from 'next/link';

/**
 * Landing page — marketing + entry points.
 *
 * Phase 1: static SSR, no 3D canvas yet. The hero demo scape lands when
 * render-agent ships the <Aquarium> composition and we dynamic-import it
 * as a client component.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="flex items-center justify-between">
        <span className="font-serif text-lg tracking-tight text-bone-100">
          Aquascape Studio
        </span>
        <nav className="flex gap-4 text-sm text-bone-300">
          <Link href="/plants" className="hover:text-bone-100">
            Plants
          </Link>
          <Link href="/scape/demo" className="hover:text-bone-100">
            Scape
          </Link>
        </nav>
      </header>

      <section className="mt-16 flex flex-col gap-6">
        <h1 className="font-serif text-4xl leading-tight text-bone-100 md:text-5xl">
          A quiet place to design a planted tank.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Sketch hardscape, brush plants, watch them grow under your light and
          CO&#8322;. Share the scape, fork someone else&apos;s, or just leaf
          through the species catalog.
        </p>
        <div className="flex gap-3">
          <Link
            href="/scape/demo"
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-base font-medium text-bone-100 transition-colors duration-hover ease-out hover:bg-ink-700"
          >
            Try the Studio
          </Link>
          <Link
            href="/plants"
            className="inline-flex h-10 items-center rounded-md border border-border px-4 text-base font-medium text-bone-100 transition-colors duration-hover ease-out hover:bg-surface-hover hover:border-accent"
          >
            Browse plants
          </Link>
        </div>
      </section>

      <footer className="mt-auto pt-24 text-xs text-muted-foreground">
        <span>MIT &copy; 2026 &middot; ink-green minimalism</span>
      </footer>
    </main>
  );
}
