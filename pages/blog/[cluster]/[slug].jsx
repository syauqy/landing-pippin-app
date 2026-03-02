import React from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getAllPosts, getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { format } from "date-fns";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import TableOfContents from "@/components/TableOfContents";
import {
  validateClusterArticle,
  getCluster,
  getPillarForCluster,
} from "@/lib/clusterMap";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

// Paragraph counter for inline product bridge
let paragraphCount = 0;

// Reset paragraph count function
const resetParagraphCount = () => {
  paragraphCount = 0;
};

const MDXComponents = {
  h1: (props) => (
    <h1
      className={`${plusJakartaSans.className} text-3xl md:text-4xl font-bold mb-6 mt-8 text-base-content scroll-mt-20`}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className={`${plusJakartaSans.className} text-2xl md:text-3xl font-bold mb-4 mt-8 text-base-content scroll-mt-20`}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className={`${plusJakartaSans.className} text-xl md:text-2xl font-semibold mb-3 mt-6 text-base-content scroll-mt-20`}
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className={`${plusJakartaSans.className} text-lg md:text-xl font-semibold mb-2 mt-4 text-base-content scroll-mt-20`}
      {...props}
    />
  ),
  p: (props) => {
    // Inject InlineProductBridge after 3rd paragraph
    paragraphCount += 1;
    const shouldInject = paragraphCount === 4;

    return (
      <>
        <p
          className="text-base md:text-lg leading-relaxed mb-6 text-base-content/80"
          {...props}
        />
        {shouldInject && <InlineProductBridge />}
      </>
    );
  },
  ul: (props) => (
    <ul
      className="list-disc list-inside mb-6 space-y-2 text-base-content/80"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside mb-6 space-y-2 text-base-content/80"
      {...props}
    />
  ),
  li: (props) => <li className="ml-4" {...props} />,
  a: (props) => (
    <a
      className="text-primary hover:underline font-medium"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-primary pl-6 italic my-6 text-base-content/70"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-base-200 px-2 py-1 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-base-200 p-4 rounded-lg overflow-x-auto mb-6"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-8 border-base-300" {...props} />,
};

// Inline Product Bridge Component (mid-article)
function InlineProductBridge() {
  return (
    <div className="my-8 p-5 bg-primary/5 border-l-4 border-primary rounded-r-lg">
      <p className="text-sm text-base-content/80 leading-relaxed">
        The practice of writing down your thoughts to release mental loops is
        central to how{" "}
        <Link href="/" className="text-primary hover:underline font-medium">
          Pippin
        </Link>{" "}
        works. It's designed to help you externalize rumination in seconds—no
        journaling required. Just brain dump, lock away, and let go.
      </p>
    </div>
  );
}

function RelatedArticleCard({ post, cluster }) {
  const { slug, frontmatter, readingTime } = post;
  const formattedDate = format(new Date(frontmatter.date), "MMM d, yyyy");
  const postCluster = post.cluster || cluster;

  return (
    <Link
      href={`/blog/${postCluster}/${slug}`}
      className="group card bg-base-100 transition-all duration-300 hover:shadow-sm border border-primary/20"
    >
      <div className="card-body p-5">
        <div className="flex items-center gap-2 text-xs text-base-content/60 mb-2">
          <time dateTime={frontmatter.date}>{formattedDate}</time>
          <span>•</span>
          <span>{readingTime} min</span>
        </div>

        <h3
          className={`${plusJakartaSans.className} text-lg font-bold mb-2 text-base-content group-hover:text-primary transition-colors line-clamp-2`}
        >
          {frontmatter.title}
        </h3>

        {frontmatter.description && (
          <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
            {frontmatter.description}
          </p>
        )}

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {frontmatter.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="badge badge-xs badge-ghost text-base-content/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function BlogPostPage({
  post,
  mdxSource,
  relatedPosts,
  cluster,
}) {
  // Reset paragraph count for this article
  resetParagraphCount();

  const { slug, frontmatter, readingTime } = post;
  const formattedDate = format(new Date(frontmatter.date), "MMMM d, yyyy");
  const canonicalUrl = `https://www.getpippin.app/blog/${cluster}/${slug}`;

  // Get cluster info for breadcrumbs
  const clusterInfo = getCluster(cluster);
  const clusterName = clusterInfo
    ? clusterInfo.name
    : cluster.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.getpippin.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.getpippin.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: clusterName,
        item: `https://www.getpippin.app/blog/${cluster}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: frontmatter.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <NextSeo
        title={`${frontmatter.title} – Pippin Blog`}
        description={frontmatter.description}
        canonical={canonicalUrl}
        openGraph={{
          type: "article",
          locale: "en_US",
          url: canonicalUrl,
          siteName: "Pippin",
          title: frontmatter.title,
          description: frontmatter.description,
          article: {
            publishedTime: frontmatter.date,
            modifiedTime: frontmatter.date,
            authors: [frontmatter.author || "Pippin"],
            tags: frontmatter.tags || [],
          },
          images: frontmatter.image
            ? [
                {
                  url: frontmatter.image,
                  width: 1200,
                  height: 630,
                  alt: frontmatter.title,
                },
              ]
            : [
                {
                  url: "/pippin-banner.jpg",
                  width: 1200,
                  height: 630,
                  alt: frontmatter.title,
                },
              ],
        }}
      />

      <ArticleJsonLd
        type="BlogPosting"
        url={canonicalUrl}
        title={frontmatter.title}
        images={
          frontmatter.image ? [frontmatter.image] : ["/pippin-banner.jpg"]
        }
        datePublished={frontmatter.date}
        dateModified={frontmatter.date}
        authorName={frontmatter.author || "Pippin"}
        description={frontmatter.description}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Wrapper for content + ToC */}
        <div className="relative w-full max-w-7xl mx-auto px-4 py-12">
          {/* Main content - centered */}
          <article className="w-full max-w-3xl mx-auto">
            <div className="max-w-3xl">
              {/* Back to Blog Button */}
              <div className="mb-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary transition-colors group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  <span>Back to Blog</span>
                </Link>
              </div>

              {/* Breadcrumb */}
              <nav className="text-sm mb-8 flex items-center gap-2">
                <Link
                  href="/blog"
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
                <span className="text-base-content/40">/</span>
                <Link
                  href={`/blog/${cluster}`}
                  className="text-base-content/60 hover:text-primary transition-colors capitalize"
                >
                  {cluster.replace(/-/g, " ")}
                </Link>
              </nav>

              {/* Title */}
              <h1
                className={`${plusJakartaSans.className} text-4xl md:text-5xl font-extrabold mb-6 text-base-content`}
              >
                {frontmatter.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-base-content/60 mb-8 pb-8 border-b border-base-300">
                <time dateTime={frontmatter.date}>{formattedDate}</time>
                <span>•</span>
                <span>{readingTime} min read</span>
                {frontmatter.author && (
                  <>
                    <span>•</span>
                    <span>{frontmatter.author}</span>
                  </>
                )}
              </div>

              {/* Tags */}
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-lg badge-ghost text-base-content/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <MDXRemote {...mdxSource} components={MDXComponents} />
              </div>

              {/* Educational Disclaimer */}
              <div className="mt-12 p-6 bg-base-200 rounded-lg">
                <h4
                  className={`${plusJakartaSans.className} font-bold mb-2 text-base-content`}
                >
                  Educational Resource
                </h4>
                <p className="text-sm text-base-content/70">
                  This article is for educational purposes and reflects common
                  experiences with overthinking. It is not medical advice or
                  mental health treatment. If you're experiencing persistent
                  distress, consider speaking with a qualified mental health
                  professional.
                </p>
              </div>

              {/* CTA Section */}
              <div className="mt-12 p-8 bg-linear-to-r from-primary/10 to-primary/5 border-2 border-primary/30 rounded-xl">
                <div className="text-center mb-6">
                  <span className="inline-block text-4xl mb-3">✨</span>
                  <h3
                    className={`${plusJakartaSans.className} text-2xl md:text-3xl font-bold mb-3 text-base-content`}
                  >
                    Try a 5-Minute Brain Dump Before Sleep
                  </h3>
                  <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
                    Tonight, set aside 5 minutes before bed. Open Pippin and
                    write down everything circulating in your mind—no filtering,
                    no organizing, just dump it all out. Watch how your mind
                    settles when your thoughts are externalized and locked away.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <div className="flex-1 sm:flex-none">
                    <div className="card bg-base-100/80 hover:bg-base-100 transition-colors">
                      <div className="card-body items-center text-center p-4">
                        <div className="text-3xl mb-2">📝</div>
                        <h4
                          className={`${plusJakartaSans.className} font-bold text-sm text-base-content`}
                        >
                          Step 1: Write
                        </h4>
                        <p className="text-xs text-base-content/60">
                          Brain dump everything in Pippin
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <div className="card bg-base-100/80 hover:bg-base-100 transition-colors">
                      <div className="card-body items-center text-center p-4">
                        <div className="text-3xl mb-2">🔒</div>
                        <h4
                          className={`${plusJakartaSans.className} font-bold text-sm text-base-content`}
                        >
                          Step 2: Lock Away
                        </h4>
                        <p className="text-xs text-base-content/60">
                          Tap lock to secure your thoughts
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <div className="card bg-base-100/80 hover:bg-base-100 transition-colors">
                      <div className="card-body items-center text-center p-4">
                        <div className="text-3xl mb-2">😴</div>
                        <h4
                          className={`${plusJakartaSans.className} font-bold text-sm text-base-content`}
                        >
                          Step 3: Let Go
                        </h4>
                        <p className="text-xs text-base-content/60">
                          Rest knowing thoughts are safe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <AppStoreButton />
                </div>
              </div>
            </div>{" "}
          </article>

          {/* Floating ToC - Desktop */}
          <aside className="hidden xl:block absolute -right-5 top-0 w-64 h-full pointer-events-none">
            <div className="sticky top-24 pointer-events-auto">
              <TableOfContents />
            </div>
          </aside>
        </div>

        {/* Table of Contents - Mobile */}
        <div className="block xl:hidden">
          <TableOfContents />
        </div>

        {/* Related Articles Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="w-full py-12 px-4 bg-base-200">
            <div className="max-w-6xl mx-auto">
              <h2
                className={`${plusJakartaSans.className} text-3xl font-bold mb-8 text-base-content`}
              >
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <RelatedArticleCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    cluster={cluster}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  const paths = posts
    .filter(
      (post) =>
        post.frontmatter.status === "published" &&
        post.cluster &&
        !post.isPillar, // Exclude pillar (index.mdx) — served by [cluster]/index.jsx
    )
    .map((post) => ({
      params: {
        cluster: post.cluster,
        slug: post.slug,
      },
    }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { cluster, slug } = params;

  // PHASE 1: Validate cluster existence and cluster/article combination
  const isValidCombination = validateClusterArticle(cluster, slug);
  if (!isValidCombination) {
    return {
      notFound: true,
    };
  }

  const post = getPostBySlug(cluster, slug);

  if (!post || post.frontmatter.status !== "published") {
    return {
      notFound: true,
    };
  }

  // Additional validation: Ensure post's cluster matches URL cluster
  if (post.cluster && post.cluster !== cluster) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });

  // Get related posts based on shared tags
  const allPosts = getPublishedPosts();
  const currentTags = post.frontmatter.tags || [];
  const currentCategories = post.frontmatter.categories || [];

  // Filter and score related posts
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.cluster === cluster && !p.isPillar) // Same cluster only, exclude pillar
    .map((p) => {
      let score = 0;
      const postTags = p.frontmatter.tags || [];
      const postCategories = p.frontmatter.categories || [];

      // Calculate relevance score
      postTags.forEach((tag) => {
        if (currentTags.includes(tag)) score += 2;
      });
      postCategories.forEach((cat) => {
        if (currentCategories.includes(cat)) score += 3;
      });

      return { ...p, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
    })
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      cluster: p.cluster,
      frontmatter: p.frontmatter,
      readingTime: p.readingTime,
    }));

  return {
    props: {
      post: {
        slug: post.slug,
        cluster: post.cluster,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
      },
      mdxSource,
      relatedPosts: relatedPosts.length > 0 ? relatedPosts : null,
      cluster,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
