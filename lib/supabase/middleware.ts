import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "./config"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  if (!isSupabaseConfigured) {
    console.warn("Supabase env vars are missing; skipping session refresh.")
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/vibes") ||
      request.nextUrl.pathname.startsWith("/circles") ||
      request.nextUrl.pathname.startsWith("/gram") ||
      request.nextUrl.pathname.startsWith("/explore") ||
      request.nextUrl.pathname.startsWith("/notifications") ||
      request.nextUrl.pathname.startsWith("/messages") ||
      request.nextUrl.pathname.startsWith("/bookmarks") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/settings") ||
      request.nextUrl.pathname.startsWith("/vault"))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Redirect logged in users away from auth pages
  if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
    const url = request.nextUrl.clone()
    url.pathname = "/explore"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
