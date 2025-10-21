import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanity";

export const runtime = "nodejs";

type CreatePostRequest = {
  title?: unknown;
  summary?: unknown;
  body?: unknown;
};

function createSlug(title: string): string {
  const normalized = title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return normalized || `post-${Date.now()}`;
}

function buildPortableText(body: string) {
  const text = body.trim();
  if (!text) {
    return [];
  }

  return [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
}

export async function POST(request: Request) {
  let payload: CreatePostRequest;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "不正なリクエストです。" },
      { status: 400 }
    );
  }

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const summary =
    typeof payload.summary === "string" ? payload.summary.trim() : undefined;
  const body =
    typeof payload.body === "string" ? payload.body.trim() : "";

  if (!title) {
    return NextResponse.json(
      { message: "タイトルは必須です。" },
      { status: 400 }
    );
  }

  if (!body) {
    return NextResponse.json(
      { message: "本文は1段落以上入力してください。" },
      { status: 400 }
    );
  }

  const slug = createSlug(title);
  const publishAt = new Date().toISOString();

  try {
    await sanityWriteClient.create({
      _type: "post",
      title,
      slug: { _type: "slug", current: slug },
      summary: summary || undefined,
      body: buildPortableText(body),
      publishAt,
    });
  } catch (error) {
    console.error("[POST /api/posts/create] create error", error);
    return NextResponse.json(
      { message: "投稿の作成に失敗しました。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ slug });
}
