import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isStudioRoute = req.nextUrl.pathname.startsWith("/studio")
  if (isStudioRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/studio/:path*"],
}
