import type { ReactElement } from "react";
import groq from "groq";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityReadClient } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";

type PortableTextSpan = {
  _key: string;
  _type: "span";
  text: string;
};

type PortableTextBlock = {
  _key: string;
  _type: string;
  children?: PortableTextSpan[];
};

type PostDetail = {
  title: string;
  publishAt: string;
  body: PortableTextBlock[];
};

const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    publishAt,
    body
  }
`;

async function fetchPost(slug: string): Promise<PostDetail | null> {
  if (!slug) return null;

  try {
    const post = await sanityReadClient.fetch<PostDetail | null>(POST_QUERY, {
      slug,
    });
    return post ?? null;
  } catch {
    return null;
  }
}

function renderBody(blocks: PortableTextBlock[]): ReactElement[] | null {
  const elements = blocks
    .filter((block) => block._type === "block")
    .map((block) => {
      const text = (block.children ?? [])
        .filter((child) => child._type === "span")
        .map((child) => child.text)
        .join("")
        .trim();

      if (!text) {
        return null;
      }

      return (
        <p key={block._key} style={{ margin: "1rem 0" }}>
          {text}
        </p>
      );
    })
    .filter((node): node is ReactElement => node !== null);

  return elements.length > 0 ? elements : null;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug ?? "");

  if (!post) {
    notFound();
  }

  return (
    <main
      style={{
        padding: "3rem 1.5rem",
        maxWidth: 720,
        margin: "0 auto",
        display: "grid",
        gap: "1.5rem",
      }}
    >
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Link
          href="/"
          style={{ color: "#2563eb", textDecoration: "underline", fontSize: "0.95rem" }}
        >
          &larr; 記事一覧へ戻る
        </Link>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>{post.title}</h1>
        <time style={{ color: "#6b7280", fontSize: "0.95rem" }}>
          {formatDate(post.publishAt)}
        </time>
      </div>
      <article>{renderBody(post.body)}</article>
    </main>
  );
}
