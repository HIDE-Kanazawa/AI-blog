'use client';

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  title: string;
  summary: string;
  body: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: "",
    summary: "",
    body: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message =
          typeof data?.message === "string"
            ? data.message
            : "投稿に失敗しました。入力内容を確認してください。";
        setError(message);
        setSubmitting(false);
        return;
      }

      const data = await response.json();
      if (typeof data?.slug === "string" && data.slug) {
        router.push(`/posts/${data.slug}`);
        router.refresh();
      } else {
        setError("投稿の作成に失敗しました。");
        setSubmitting(false);
      }
    } catch (err) {
      console.error("[POST /api/posts/create]", err);
      setError("投稿の作成中にエラーが発生しました。");
      setSubmitting(false);
    }
  };

  return (
    <main
      style={{
        padding: "3rem 1.5rem",
        maxWidth: 720,
        margin: "0 auto",
        display: "grid",
        gap: "2rem",
      }}
    >
      <header style={{ display: "grid", gap: "0.75rem" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>管理用投稿フォーム</h1>
        <p style={{ margin: 0, color: "#555" }}>
          タイトルと本文は必須です。1段落の本文でも投稿できます。
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "1.5rem" }}
        noValidate
      >
        <label style={{ display: "grid", gap: "0.5rem" }}>
          <span>タイトル *</span>
          <input
            type="text"
            value={form.title}
            onChange={handleChange("title")}
            required
            disabled={submitting}
            style={{
              padding: "0.75rem 0.9rem",
              borderRadius: 8,
              border: "1px solid #d4d4d8",
              fontSize: "1rem",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: "0.5rem" }}>
          <span>要約（任意）</span>
          <textarea
            value={form.summary}
            onChange={handleChange("summary")}
            rows={3}
            disabled={submitting}
            style={{
              padding: "0.75rem 0.9rem",
              borderRadius: 8,
              border: "1px solid #d4d4d8",
              fontSize: "1rem",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: "0.5rem" }}>
          <span>本文 *</span>
          <textarea
            value={form.body}
            onChange={handleChange("body")}
            rows={10}
            required
            disabled={submitting}
            style={{
              padding: "0.75rem 0.9rem",
              borderRadius: 8,
              border: "1px solid #d4d4d8",
              fontSize: "1rem",
            }}
          />
        </label>

        {error ? (
          <p style={{ margin: 0, color: "#dc2626" }}>{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontSize: "1rem",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "投稿中..." : "投稿する"}
        </button>
      </form>
    </main>
  );
}
