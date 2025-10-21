export function formatDate(isoString: string | null | undefined): string {
  if (!isoString) {
    return "";
  }

  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "";
  }
}
