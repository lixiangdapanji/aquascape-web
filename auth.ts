import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const { findUserByEmail, verifyPassword } = await import("@/lib/db/users")
          const user = await findUserByEmail(credentials.email as string)
          if (!user) return null
          const ok = await verifyPassword(credentials.password as string, user.passwordHash)
          if (!ok) return null
          return { id: user.email, email: user.email, name: user.name, image: user.image ?? null }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
})
