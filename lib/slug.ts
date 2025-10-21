const INVALID_CHAR_PATTERN = /[^a-z0-9-]/g;
const DASH_DUPLICATE_PATTERN = /-{2,}/g;

export function createSlug(input: string): string {
  if (!input) {
    return "";
  }

  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(INVALID_CHAR_PATTERN, "-")
    .replace(DASH_DUPLICATE_PATTERN, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return normalized || "untitled";
}
