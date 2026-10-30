import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const folder = (formData.get("folder") as string) || "uploads"

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploadedUrls: string[] = []

    for (const file of files) {
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { data, error } = await supabase.storage.from("media").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("[v0] Upload error:", error)
        continue
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(data.path)

      uploadedUrls.push(publicUrl)
    }

    return NextResponse.json({ urls: uploadedUrls })
  } catch (error) {
    console.error("[v0] Error uploading files:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
