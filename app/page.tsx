import Link from "next/link";
import groq from "groq";
import { sanityReadClient } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";

const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishAt desc)[0...10]{
    _id,
    _type,
    title,
    "slug": slug.current,
    summary,
    publishAt
  }
`;

type PostListItem = {
  _id: string;
  title: string;
  slug: string | null;
  summary?: string;
  publishAt: string;
};

async function fetchPosts(): Promise<PostListItem[]> {
  try {
    return await sanityReadClient.fetch(POSTS_QUERY);
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await fetchPosts();

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
        <h1 style={{ fontSize: "2.25rem", margin: 0 }}>Vibe Coding Blog</h1>
        <p style={{ color: "#555", margin: 0 }}>
          最新の記事を10件まで表示します。まだ記事がない場合は空の状態が表示されます。
        </p>
      </header>

      <section aria-live="polite" style={{ display: "grid", gap: "1rem" }}>
        {posts.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              border: "1px dashed #d0d0d0",
              borderRadius: 12,
              color: "#777",
              margin: 0,
            }}
          >
            まだ記事がありません。投稿が追加されるとここに表示されます。
          </p>
        ) : (
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "1.25rem",
            }}
          >
            {posts.map((post) => (
              <li
                key={post._id}
                style={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 12,
                  padding: "1.5rem 1.25rem",
                  display: "grid",
                  gap: "0.75rem",
                }}
              >
                <h2 style={{ fontSize: "1.5rem", margin: 0 }}>
                  <Link
                    href={post.slug ? `/posts/${post.slug}` : "#"}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {post.title}
                  </Link>
                </h2>
                <time style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                  {formatDate(post.publishAt)}
                </time>
                {post.summary ? (
                  <p style={{ margin: 0, color: "#444" }}>{post.summary}</p>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
