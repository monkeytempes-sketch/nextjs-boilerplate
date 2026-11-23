"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Hapus post ini?")) return;

    const res = await fetch(`/api/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Gagal menghapus");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Hapus
    </button>
  );
}