import type { APIRoute } from "astro";

function createRobotsTxt(sitemapUrl: URL) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemapUrl.href}`,
    "",
  ].join("\n");
}

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error("Astro site URL is required for robots.txt.");
  }

  const sitemapUrl = new URL("sitemap-index.xml", site);

  return new Response(createRobotsTxt(sitemapUrl), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
