import Link from 'next/link';
import { ScapeViewer } from './ScapeViewer';

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Public scape viewer. Server-rendered frame, client-rendered 3D canvas.
 *
 * Phase 1 hard-codes a small demo scape (60x30x36 cm tank, a couple of
 * rocks, a couple of placeholder stems) until the persistence layer and
 * scape schema land.
 */
export default async function ScapePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="mb-6 flex items-baseline justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl text-bone-100">Scape</h1>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {id}
          </span>
        </div>
        <Link href="/" className="text-sm text-bone-300 hover:text-bone-100">
          Home
        </Link>
      </header>

      <section className="overflow-hidden rounded-lg border border-border/40 bg-surface">
        <ScapeViewer />
      </section>

      <p className="mt-4 text-sm text-muted-foreground">
        Hardscape and plant placement are placeholders. Plant brush, timeline,
        and PAR / CO&#8322; gauges arrive in Phase 2.
      </p>
    </main>
  );
}
