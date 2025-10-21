export type PortableTextSpan = {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children: PortableTextSpan[];
  markDefs: Array<Record<string, unknown>>;
  style?: string;
};

export type Post = {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  summary?: string;
  body: PortableTextBlock[];
  publishAt: string; // ISO8601
};
