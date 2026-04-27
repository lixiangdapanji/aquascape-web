import { auth } from "@/auth"
import Link from "next/link"

export default async function StudioPage() {
  const session = await auth()

  return (
    <main className="p-8">
      {!session && (
        <div
          className="mb-6 flex items-center justify-between rounded-xl border px-5 py-4"
          style={{ backgroundColor: "#0F2A20", borderColor: "#1E3A2E" }}
        >
          <p className="text-sm" style={{ color: "#8FAF9A" }}>
            You're exploring as a guest. Sign in to save your aquascapes.
          </p>
          <div className="flex gap-3 ml-4 shrink-0">
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#3A6B50", color: "#EDE7D9" }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#1E3A2E", color: "#8FAF9A" }}
            >
              Register
            </Link>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold" style={{ color: "#EDE7D9" }}>
        {session?.user?.name ? `Welcome, ${session.user.name}` : "Aquascape Studio"}
      </h1>
      <p className="mt-2" style={{ color: "#8FAF9A" }}>
        Your studio is coming soon.
      </p>
    </main>
  )
}
