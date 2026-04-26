import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function StudioPage() {
  const session = await auth()
  if (!session) redirect("/login")
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
      <p className="text-gray-500 mt-2">Your studio is coming soon.</p>
    </main>
  )
}
