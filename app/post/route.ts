import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const [created] = await db
    .insert(posts)
    .values({ title, content, createdAt: new Date().toISOString() })
    .returning();
  return NextResponse.json(created, { status: 201 });
}