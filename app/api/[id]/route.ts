import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = Number(id);

    if (Number.isNaN(postId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await db.delete(posts).where(eq(posts.id, postId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}