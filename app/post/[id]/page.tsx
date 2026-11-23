import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)))
    .get();

  if (!post) notFound();

  return (
    <main className="container mt-4">
      <h1>{post.title}</h1>
      <p className="text-muted">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleDateString("id-ID")
          : "-"}
      </p>
      <p>{post.content}</p>
      <Link href="/" className="btn btn-secondary">
        Back
      </Link>
    </main>
  );
}