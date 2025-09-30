export type ContentType = "document" | "tweet" | "links" | "video";

function extractYouTubeId(inputUrl: string): string | null {
  try {
    const url = new URL(inputUrl);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1) || null;
    }
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/watch")) {
        return url.searchParams.get("v");
      }
      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/")[2] || null;
      }
      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2] || null;
      }
    }
  } catch {
    // fallthrough
  }
  return null;
}

export function toEmbedUrl(type: ContentType, url: string): string {
  if (!url) return "";
  if (type === "tweet") {
    return `https://twitframe.com/show?url=${encodeURIComponent(url.trim())}`;
  }
  if (type === "video") {
    return url.replace("watch?v=", "embed/");
  }
  // documents or generic links: attempt direct embed
  return url;
}
