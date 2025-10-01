export type ContentType = "document" | "tweet" | "links" | "video";

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
