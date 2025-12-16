/** @type {import('next-sitemap').IConfig} */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

module.exports = {
  siteUrl: process.env.SITE_URL || "https://matcharge.app",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  exclude: ["/server-sitemap.xml", "/test", "/blog", "/contact"], // Exclude server-side generated pages if any
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  transform: async (config, urlPath) => {
    // Default transformations for all pages
    const entry = {
      loc: urlPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };

    // Custom transformation for blog posts to get lastmod from frontmatter
    if (urlPath.startsWith("/blog/") && urlPath.length > "/blog/".length) {
      const slug = urlPath.split("/blog/")[1];
      try {
        const blogDir = path.join(process.cwd(), "public/content/blog");
        const filePath = path.join(blogDir, `${slug}.md`);
        const content = fs.readFileSync(filePath, "utf8");
        const { data } = matter(content);
        if (data.date) {
          entry.lastmod = new Date(data.date).toISOString();
        }
      } catch (e) {
        console.warn(`Could not read frontmatter for ${urlPath} to get date.`);
      }
    }

    return entry;
  },
};
