import { auth } from "@/auth"
import Link from "next/link"

const BG = "#0F2A20"
const BORDER = "#1E3A2E"
const TEXT = "#EDE7D9"
const MUTED = "#8FAF9A"
const ACCENT = "#3A6B50"

export default async function StudioPage() {
  const session = await auth()

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {!session && (
        <div
          className="mb-8 flex items-center justify-between rounded-xl border px-5 py-4"
          style={{ backgroundColor: BG, borderColor: BORDER }}
        >
          <p className="text-sm" style={{ color: MUTED }}>
            以访客身份体验。登录后可保存你的水草缸方案。
          </p>
          <div className="flex gap-3 ml-4 shrink-0">
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: ACCENT, color: TEXT }}
            >
              登录
            </Link>
            <Link
              href="/register"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: BORDER, color: MUTED }}
            >
              注册
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: TEXT }}>
          {session?.user?.name ? `${session.user.name} 的工作室` : "水草工作室"}
        </h1>
        <p className="mt-1 text-sm" style={{ color: MUTED }}>
          设计你的水草缸，运行生长模拟
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        <ActionCard
          icon="🌿"
          title="新建水草缸"
          desc="从空白缸开始设计"
          href="/studio/new"
          primary
        />
        <ActionCard
          icon="🔬"
          title="运行模拟"
          desc="模拟植物30天生长曲线"
          href="/studio/sim"
        />
        <ActionCard
          icon="📚"
          title="浏览植物库"
          desc="查看15种水草的参数"
          href="/plants"
        />
      </div>

      {/* My scapes */}
      <section>
        <h2 className="text-lg font-semibold mb-4" style={{ color: TEXT }}>
          我的水草缸
        </h2>
        <EmptyScapes loggedIn={!!session} />
      </section>

      {/* Feature preview */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4" style={{ color: TEXT }}>
          即将上线
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FeatureCard icon="🎨" title="3D 可视化" desc="实时渲染水草缸三维效果" />
          <FeatureCard icon="📈" title="1年生长模拟" desc="预测植物生物量与健康度变化" />
          <FeatureCard icon="💧" title="水质管理" desc="CO₂ / 肥料 / 光照联动计算" />
          <FeatureCard icon="🤝" title="分享方案" desc="导出并分享你的造景配置" />
        </div>
      </section>
    </main>
  )
}

function ActionCard({
  icon, title, desc, href, primary,
}: {
  icon: string; title: string; desc: string; href: string; primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-xl border p-5 transition-opacity hover:opacity-80"
      style={{
        backgroundColor: primary ? ACCENT : BG,
        borderColor: primary ? ACCENT : BORDER,
      }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-sm" style={{ color: TEXT }}>{title}</span>
      <span className="text-xs" style={{ color: primary ? "#c8e6d4" : MUTED }}>{desc}</span>
    </Link>
  )
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border p-4"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-medium" style={{ color: TEXT }}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: MUTED }}>{desc}</p>
      </div>
    </div>
  )
}

function EmptyScapes({ loggedIn }: { loggedIn: boolean }) {
  return (
    <div
      className="rounded-xl border border-dashed flex flex-col items-center justify-center py-14 px-6 text-center"
      style={{ borderColor: BORDER }}
    >
      <span className="text-4xl mb-3">🪴</span>
      <p className="text-sm font-medium mb-1" style={{ color: TEXT }}>还没有水草缸</p>
      <p className="text-xs mb-4" style={{ color: MUTED }}>
        {loggedIn
          ? "点击「新建水草缸」开始你的第一个造景方案"
          : "登录后即可创建并保存你的造景方案"}
      </p>
      {loggedIn ? (
        <Link
          href="/studio/new"
          className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: ACCENT, color: TEXT }}
        >
          新建水草缸
        </Link>
      ) : (
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: ACCENT, color: TEXT }}
        >
          登录
        </Link>
      )}
    </div>
  )
}
