import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return NextResponse.json(allPosts);
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newPost = await db.insert(posts).values({ title, content }).returning();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}