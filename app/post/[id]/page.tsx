import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)));

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
      <div className="d-flex gap-2">
        <Link href="/" className="btn btn-secondary">
          Back
        </Link>
        <Link href={`/post/${post.id}/edit`} className="btn btn-warning">
          Edit
        </Link>
        <DeleteButton id={post.id} />
      </div>
    </main>
  );
}