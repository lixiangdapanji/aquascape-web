import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <section className="mt-16 flex flex-col gap-6">
        <h1 className="text-4xl font-bold" style={{ color: '#EDE7D9' }}>
          Aquascape Studio
        </h1>
        <p style={{ color: '#CFC7B4' }}>
          Design, simulate, and share planted-aquarium scapes.
        </p>
        <div>
          <Link
            href="/plants"
            className="inline-flex h-10 items-center rounded-md px-4 text-base font-medium transition-colors"
            style={{ backgroundColor: '#2F6E55', color: '#EDE7D9' }}
          >
            Browse Plants
          </Link>
        </div>
      </section>
    </main>
  );
}
