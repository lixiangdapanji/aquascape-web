import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((_req) => {
  // Studio is open to guests — auth state is checked inside the page.
  return NextResponse.next()
})

export const config = {
  matcher: ["/studio/:path*"],
}
