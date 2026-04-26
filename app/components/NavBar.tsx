import Link from "next/link"
import { auth, signOut } from "@/auth"

export default async function NavBar() {
  const session = await auth()

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{ backgroundColor: '#0F2A20', borderColor: '#1E3A2E' }}
    >
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight"
        style={{ color: '#EDE7D9' }}
      >
        Aquascape Studio
      </Link>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <div className="flex items-center gap-3">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User avatar"}
                  className="h-8 w-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <span className="text-sm" style={{ color: '#EDE7D9' }}>
                {session.user.name}
              </span>
            </div>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <button
                type="submit"
                className="rounded-md px-3 py-1.5 text-sm transition-colors"
                style={{ backgroundColor: '#1E3A2E', color: '#8FAF9A' }}
              >
                Sign out
              </button>
            </form>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-md px-3 py-1.5 text-sm transition-colors"
            style={{ backgroundColor: '#1E3A2E', color: '#8FAF9A' }}
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  )
}
