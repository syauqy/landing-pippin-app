import React from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getPillarPage, getPostsByCluster, getAllClusters } from "@/lib/blog";
import { format } from "date-fns";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import TableOfContents from "@/components/TableOfContents";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

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
  p: (props) => (
    <p
      className="text-base md:text-lg leading-relaxed mb-6 text-base-content/80"
      {...props}
    />
  ),
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

function ClusterArticleCard({ post, cluster }) {
  const { slug, frontmatter, readingTime } = post;
  const formattedDate = format(new Date(frontmatter.date), "MMM d, yyyy");

  return (
    <Link
      href={`/blog/${cluster}/${slug}`}
      className="group card bg-base-100 hover:bg-base-300 transition-all duration-300 hover:shadow-lg"
    >
      <div className="card-body p-6">
        <div className="flex items-center gap-3 text-sm text-base-content/60 mb-3">
          <time dateTime={frontmatter.date}>{formattedDate}</time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        <h3
          className={`${plusJakartaSans.className} text-xl font-bold mb-3 text-base-content group-hover:text-primary transition-colors`}
        >
          {frontmatter.title}
        </h3>

        {frontmatter.description && (
          <p className="text-base-content/70 line-clamp-3 mb-4">
            {frontmatter.description}
          </p>
        )}

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="badge badge-sm badge-ghost text-base-content/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-3 transition-all">
          <span>Read article</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function PillarPage({
  pillar,
  mdxSource,
  clusterPosts,
  cluster,
}) {
  const { frontmatter, readingTime } = pillar;
  const formattedDate = format(new Date(frontmatter.date), "MMMM d, yyyy");
  const canonicalUrl = `https://www.getpippin.app/blog/${cluster}`;
  const clusterTitle = cluster
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // FAQ Schema for JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why does overthinking get worse at night?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your brain isn't designed to turn off. At night, the external stimulation that normally occupies your attention disappears. Thoughts that you managed throughout the day—through conversation, tasks, and movement—suddenly have space to expand. It's not that overthinking is worse at night; it's that you notice it more.",
        },
      },
      {
        "@type": "Question",
        name: "Is nighttime overthinking normal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The experience of thoughts intensifying when external stimulation drops is normal for almost everyone. You're not broken if this happens to you. What varies is how much it affects your sleep and your quality of life.",
        },
      },
      {
        "@type": "Question",
        name: "Is overthinking a sleep disorder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Overthinking itself isn't a clinical sleep disorder. However, when racing thoughts prevent sleep night after night, it can contribute to insomnia. Addressing the overthinking often improves sleep quality.",
        },
      },
      {
        "@type": "Question",
        name: "Does journaling before bed actually help?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For many people, yes. Research on expressive writing shows that moving thoughts from your mind to paper reduces their psychological weight. You're signaling to your brain that the information has been captured and doesn't need to be held in active memory.",
        },
      },
      {
        "@type": "Question",
        name: "How do I stop racing thoughts immediately?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There's no instant off switch, but several techniques can slow them: grounding exercises like the 5-4-3-2-1 method redirect attention to the present. Progressive muscle relaxation gives your body a task. A 4-7-8 breathing pattern activates your parasympathetic nervous system.",
        },
      },
      {
        "@type": "Question",
        name: "When should I seek professional help?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you've tried these practices for several weeks and nighttime overthinking is still dominating your sleep, consider speaking with a mental health professional. Some patterns respond better to professional guidance.",
        },
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
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Wrapper for content + ToC */}
        <div className="relative w-full max-w-7xl mx-auto px-4 py-12">
          {/* Main content - centered */}
          <article className="w-full max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8">
              <Link
                href="/blog"
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                ← Back to Blog
              </Link>
            </nav>

            {/* Pillar Badge */}
            <div className="mb-4">
              <span className="badge badge-lg badge-primary">Pillar Guide</span>
            </div>

            {/* Title */}
            <h1
              className={`${plusJakartaSans.className} text-4xl md:text-6xl font-extrabold mb-6 text-base-content`}
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
                  Tonight, set aside 5 minutes before bed. Open Pippin and write
                  down everything circulating in your mind—no filtering, no
                  organizing, just dump it all out. Watch how your mind settles
                  when your thoughts are externalized and locked away.
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
                <a
                  href="https://apps.apple.com/us/app/pippin-overthinking-journal/id6755423327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us"
                    alt="Download on the App Store"
                    className="w-[200px] h-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </article>

          {/* Floating ToC - Desktop */}
          <aside className="hidden lg:block absolute right-0 top-0 w-64 h-full pointer-events-none">
            <div className="sticky top-24 pointer-events-auto">
              <TableOfContents />
            </div>
          </aside>
        </div>

        {/* Table of Contents - Mobile */}
        <div className="block lg:hidden">
          <TableOfContents />
        </div>

        {/* Related Articles in This Topic */}
        {clusterPosts && clusterPosts.length > 0 && (
          <section className="w-full py-12 px-4 bg-base-200">
            <div className="max-w-6xl mx-auto">
              <h2
                className={`${plusJakartaSans.className} text-3xl font-bold mb-2 text-base-content`}
              >
                More on {clusterTitle}
              </h2>
              <p className="text-base-content/70 mb-8">
                Explore related articles in this topic
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clusterPosts.map((post) => (
                  <ClusterArticleCard
                    key={post.slug}
                    post={post}
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
  const clusters = getAllClusters();

  const paths = clusters.map((cluster) => ({
    params: { cluster },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { cluster } = params;
  const pillar = getPillarPage(cluster);

  if (!pillar || pillar.frontmatter.status !== "published") {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(pillar.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });

  // Get all posts in this cluster (exclude pillar)
  const clusterPosts = getPostsByCluster(cluster)
    .filter((post) => !post.isPillar && post.frontmatter.status === "published")
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .map((post) => ({
      slug: post.slug,
      cluster: post.cluster,
      frontmatter: post.frontmatter,
      readingTime: post.readingTime,
    }));

  return {
    props: {
      pillar: {
        cluster: pillar.cluster,
        frontmatter: pillar.frontmatter,
        readingTime: pillar.readingTime,
      },
      mdxSource,
      clusterPosts: clusterPosts.length > 0 ? clusterPosts : null,
      cluster,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
