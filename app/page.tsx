import Link from 'next/link';

/* ---------- decorative tank SVG ---------- */
function TankIllustration() {
  return (
    <svg
      viewBox="0 0 420 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-md mx-auto"
    >
      {/* Tank frame */}
      <rect x="12" y="20" width="396" height="228" rx="6" stroke="#2F6E55" strokeWidth="3" fill="#0A1F18" />

      {/* Water fill */}
      <clipPath id="tank-clip">
        <rect x="14" y="22" width="392" height="224" rx="5" />
      </clipPath>
      <g clipPath="url(#tank-clip)">
        <rect x="14" y="22" width="392" height="224" fill="#0A2920" />

        {/* Wavy water surface */}
        <path
          d="M14 72 Q60 60 100 72 Q140 84 180 72 Q220 60 260 72 Q300 84 340 72 Q380 60 406 72 L406 22 L14 22 Z"
          fill="#0F3A28"
          opacity="0.7"
        />
        <path
          d="M14 76 Q55 65 95 76 Q135 87 175 76 Q215 65 255 76 Q295 87 335 76 Q375 65 406 76"
          stroke="#2F6E55"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Substrate / gravel */}
        <rect x="14" y="218" width="392" height="28" fill="#0D2419" />
        <path d="M14 218 Q80 212 140 218 Q200 224 260 218 Q320 212 406 218" stroke="#1E3A2E" strokeWidth="1" />

        {/* Plant stems — left group */}
        <g opacity="0.9">
          {/* Tall stem */}
          <line x1="60" y1="218" x2="60" y2="100" stroke="#2F6E55" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="60" cy="100" rx="14" ry="9" fill="#2F6E55" />
          <ellipse cx="48" cy="115" rx="11" ry="7" fill="#3A7D62" />
          <ellipse cx="72" cy="118" rx="11" ry="7" fill="#3A7D62" />
          {/* Shorter stem */}
          <line x1="85" y1="218" x2="85" y2="140" stroke="#2F6E55" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="85" cy="140" rx="11" ry="7" fill="#3A7D62" />
          <ellipse cx="75" cy="153" rx="9" ry="6" fill="#2F6E55" />
          {/* Feathery stem */}
          <line x1="40" y1="218" x2="40" y2="130" stroke="#245845" strokeWidth="2" strokeLinecap="round" />
          <path d="M40 130 Q30 120 22 125" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 145 Q28 138 20 142" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 160 Q30 155 24 158" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 130 Q50 120 58 125" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 145 Q52 138 60 142" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Plant stems — right group */}
        <g opacity="0.9">
          <line x1="340" y1="218" x2="340" y2="95" stroke="#2F6E55" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="340" cy="95" rx="14" ry="9" fill="#2F6E55" />
          <ellipse cx="328" cy="110" rx="11" ry="7" fill="#3A7D62" />
          <ellipse cx="352" cy="112" rx="11" ry="7" fill="#3A7D62" />

          <line x1="362" y1="218" x2="362" y2="145" stroke="#245845" strokeWidth="2" strokeLinecap="round" />
          <path d="M362 145 Q372 135 380 140" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M362 160 Q374 153 382 157" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M362 175 Q372 170 378 173" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M362 145 Q352 135 344 140" stroke="#2F6E55" strokeWidth="1.5" strokeLinecap="round" />

          <line x1="318" y1="218" x2="318" y2="148" stroke="#2F6E55" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="318" cy="148" rx="11" ry="7" fill="#3A7D62" />
        </g>

        {/* Centre foreground — low carpet */}
        <ellipse cx="160" cy="215" rx="50" ry="8" fill="#1A4030" />
        <ellipse cx="260" cy="215" rx="45" ry="7" fill="#1A4030" />
        <ellipse cx="210" cy="216" rx="35" ry="6" fill="#245845" />

        {/* Rock hardscape */}
        <path d="M130 218 L115 190 L145 185 L165 195 L155 218 Z" fill="#132E22" stroke="#1E3A2E" strokeWidth="1" />
        <path d="M255 218 L245 195 L270 188 L285 200 L275 218 Z" fill="#132E22" stroke="#1E3A2E" strokeWidth="1" />

        {/* Bubble trail */}
        <circle cx="200" cy="180" r="3" fill="none" stroke="#2F6E55" strokeWidth="1" opacity="0.5" />
        <circle cx="205" cy="158" r="2" fill="none" stroke="#2F6E55" strokeWidth="1" opacity="0.4" />
        <circle cx="198" cy="138" r="2.5" fill="none" stroke="#2F6E55" strokeWidth="1" opacity="0.35" />
      </g>

      {/* Corner seams */}
      <rect x="12" y="20" width="10" height="228" rx="3" fill="#0F2A20" opacity="0.5" />
      <rect x="398" y="20" width="10" height="228" rx="3" fill="#0F2A20" opacity="0.5" />
    </svg>
  );
}

/* ---------- feature cards data ---------- */
const FEATURES = [
  {
    icon: '🌿',
    title: 'Plant Library',
    description: 'Browse 36 species with CO₂, light, and difficulty data.',
    href: '/plants',
  },
  {
    icon: '🔬',
    title: 'Growth Simulation',
    description: 'P–I curve model with real CO₂ and temperature response.',
    href: null,
  },
  {
    icon: '🎨',
    title: '3D Preview',
    description: 'Visualise your scape with React Three Fiber before you build it.',
    href: '/studio',
  },
] as const;

/* ---------- page ---------- */
export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#0A1F18', color: '#EDE7D9' }}>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Copy */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            style={{ color: '#EDE7D9' }}
          >
            Design Your Perfect<br />
            <span style={{ color: '#2F6E55' }}>Planted Aquarium</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto lg:mx-0" style={{ color: '#CFC7B4' }}>
            Simulate plant growth, manage nutrients, and visualise your aquascape
            in 3D — before a single drop of water.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/plants"
              className="inline-flex h-11 items-center rounded-md px-6 text-base font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2F6E55', color: '#EDE7D9' }}
            >
              Browse Plants
            </Link>
            <Link
              href="/studio"
              className="inline-flex h-11 items-center rounded-md border px-6 text-base font-semibold transition-colors hover:opacity-80"
              style={{ borderColor: '#2F6E55', color: '#EDE7D9', backgroundColor: 'transparent' }}
            >
              Open Studio
            </Link>
          </div>
        </div>

        {/* Tank illustration */}
        <div className="flex-1 w-full max-w-md lg:max-w-none">
          <TankIllustration />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div
        className="border-y"
        style={{ borderColor: '#1E3A2E', backgroundColor: '#0F2A20' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap justify-center gap-8 text-sm font-medium tracking-wide">
          {['36 Species', 'Real-time Simulation', 'Free to Use'].map((stat) => (
            <span key={stat} style={{ color: '#8FAF9A' }}>
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-12"
          style={{ color: '#EDE7D9' }}
        >
          Everything you need to plan your scape
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, description, href }) => {
            const card = (
              <div
                className="flex flex-col gap-4 rounded-lg p-6 border-t-2 transition-opacity"
                style={{
                  backgroundColor: '#132E22',
                  borderTopColor: '#2F6E55',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                }}
              >
                <span className="text-3xl" role="img" aria-label={title}>{icon}</span>
                <h3 className="text-lg font-semibold" style={{ color: '#EDE7D9' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#CFC7B4' }}>
                  {description}
                </p>
                {href && (
                  <span className="text-sm font-medium mt-auto" style={{ color: '#2F6E55' }}>
                    Explore →
                  </span>
                )}
              </div>
            );

            return href ? (
              <Link key={title} href={href} className="hover:opacity-90 transition-opacity">
                {card}
              </Link>
            ) : (
              <div key={title}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t"
        style={{ backgroundColor: '#0F2A20', borderColor: '#1E3A2E' }}
      >
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo */}
          <span className="text-base font-semibold" style={{ color: '#EDE7D9' }}>
            Aquascape Studio
          </span>

          {/* Links */}
          <nav className="flex flex-wrap gap-6 text-sm" style={{ color: '#8FAF9A' }}>
            <Link href="/plants" className="hover:opacity-80 transition-opacity">Plants</Link>
            <Link href="/studio" className="hover:opacity-80 transition-opacity">Studio</Link>
            <a
              href="https://github.com/aquascape-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              GitHub
            </a>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t"
          style={{ borderColor: '#1E3A2E' }}
        >
          <div className="mx-auto max-w-6xl px-6 py-4 text-xs" style={{ color: '#8FAF9A' }}>
            © 2026 Aquascape Studio
          </div>
        </div>
      </footer>
    </main>
  );
}
