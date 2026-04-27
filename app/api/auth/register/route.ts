import { NextRequest, NextResponse } from "next/server"
import { findUserByEmail, createUser, hashPassword } from "@/lib/db/users"

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json()

    if (!email || !name || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const existing = await findUserByEmail(email.toLowerCase())
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const hash = await hashPassword(password)
    await createUser(email.toLowerCase(), name.trim(), hash)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("register error", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
