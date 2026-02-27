import React, { useState, useMemo } from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getPublishedPosts, getAllTags } from "@/lib/blog";
import Link from "next/link";
import { format } from "date-fns";
import { SearchX } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

export default function BlogIndexPage({ posts, tags }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.frontmatter.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (post.frontmatter.description &&
          post.frontmatter.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (post.frontmatter.tags &&
          post.frontmatter.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ));

      const matchesTag =
        selectedTag === null ||
        (post.frontmatter.tags && post.frontmatter.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <NextSeo
        title="Overthinking Education – Pippin Blog"
        description="Calm, research-backed insights on overthinking, racing thoughts, and mental quiet. Learn practical ways to understand and manage your mind."
        canonical="https://getpippin.app/blog"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://getpippin.app/blog",
          siteName: "Pippin",
          title: "Overthinking Education – Pippin Blog",
          description:
            "Calm, research-backed insights on overthinking, racing thoughts, and mental quiet.",
          images: [
            {
              url: "/pippin-banner.jpg",
              width: 1200,
              height: 630,
              alt: "Pippin Blog",
            },
          ],
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className={`${plusJakartaSans.className} text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-base-content`}
            >
              Overthinking Education
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-8">
              Calm, research-backed insights on managing racing thoughts and
              finding mental quiet.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles by title, topic, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 md:py-4 pl-12 rounded-lg bg-base-200 text-base-content placeholder-base-content/40 border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.5 10.5Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Tags Section */}
        {tags.length > 0 && (
          <section className="w-full py-12 px-4 bg-base-200/50">
            <div className="max-w-6xl mx-auto">
              <h2
                className={`${plusJakartaSans.className} text-2xl font-bold mb-6 text-base-content`}
              >
                Topics
              </h2>
              <div className="flex flex-wrap gap-3">
                {/* Show all topics button */}
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`badge badge-lg transition-all ${
                    selectedTag === null
                      ? "badge-primary text-primary-content"
                      : "badge-outline text-base-content/70 hover:badge-primary hover:text-primary-content"
                  }`}
                >
                  All Topics
                </button>

                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                    className={`badge badge-lg transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "badge-primary text-primary-content"
                        : "badge-outline text-base-content/70 hover:badge-primary hover:text-primary-content"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="w-full py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <SearchX size={64} className="text-base-content/30" />
                </div>
                <p className="text-base-content/60 text-lg mb-2">
                  No articles found
                </p>
                <p className="text-base-content/50 text-sm mb-6">
                  {selectedTag
                    ? `Try selecting a different topic or clearing your search`
                    : `Try adjusting your search terms or exploring our topics below`}
                </p>
                {(searchQuery || selectedTag) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTag(null);
                    }}
                    className="btn btn-sm btn-outline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function BlogCard({ post }) {
  const { slug, cluster, frontmatter, readingTime, isPillar } = post;
  const formattedDate = format(new Date(frontmatter.date), "MMM d, yyyy");

  // Generate proper URL based on structure
  const postUrl =
    isPillar && slug === "index"
      ? `/blog/${cluster}`
      : cluster
        ? `/blog/${cluster}/${slug}`
        : `/blog/${slug}`;

  return (
    <Link
      href={postUrl}
      className="group card bg-base-200 hover:bg-base-300 transition-all duration-300 hover:shadow-xl"
    >
      <div className="card-body p-6">
        {/* Date and Reading Time */}
        <div className="flex items-center gap-3 text-sm text-base-content/60 mb-3">
          <time dateTime={frontmatter.date}>{formattedDate}</time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Title */}
        <h3
          className={`${plusJakartaSans.className} text-xl font-bold mb-3 text-base-content group-hover:text-primary transition-colors`}
        >
          {frontmatter.title}
        </h3>

        {/* Excerpt */}
        {frontmatter.description && (
          <p className="text-base-content/70 line-clamp-3 mb-4">
            {frontmatter.description}
          </p>
        )}

        {/* Tags */}
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

        {/* Read More Arrow */}
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

export async function getStaticProps() {
  const posts = getPublishedPosts();
  const tags = getAllTags(posts);

  return {
    props: {
      posts: posts.map((post) => ({
        slug: post.slug,
        cluster: post.cluster || null,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
        isPillar: post.isPillar || false,
      })),
      tags,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
