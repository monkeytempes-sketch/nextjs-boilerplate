"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Hapus post ini?")) return;
    const res = await fetch(`/api/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("Gagal menghapus");
    }
  }

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
}