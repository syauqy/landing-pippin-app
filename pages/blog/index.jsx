import React, { useState, useMemo } from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getPublishedPosts, getAllTags } from "@/lib/blog";
import { consolidateTags } from "@/lib/tagConsolidation";
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
  const [showAllTags, setShowAllTags] = useState(false);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => !post.isPillar) // Exclude pillar pages from regular grid
      .filter((post) => {
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
          (post.frontmatter.tags &&
            consolidateTags(post.frontmatter.tags).includes(selectedTag));

        return matchesSearch && matchesTag;
      });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <NextSeo
        title="Overthinking Education – Pippin Blog"
        description="Calm, research-backed insights on overthinking, racing thoughts, and mental quiet. Learn practical ways to understand and manage your mind."
        canonical="https://www.getpippin.app/blog"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.getpippin.app/blog",
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
                  className="w-full px-4 py-3 md:py-4 pl-12 rounded-2xl bg-base-200 text-base-content placeholder-base-content/40 border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
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
        {!searchQuery && tags.length > 0 && (
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
                      : "badge-outline text-base-content/70 hover:bg-base-300 hover:text-base-content"
                  }`}
                >
                  All Topics
                </button>

                {(showAllTags ? tags : tags.slice(0, 9)).map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                    className={`badge badge-lg transition-all cursor-pointer capitalize ${
                      selectedTag === tag
                        ? "badge-primary text-primary-content"
                        : "badge-outline text-base-content/70 hover:bg-base-300 hover:text-base-content"
                    }`}
                  >
                    {tag}
                  </button>
                ))}

                {/* Show More/Less button on mobile */}
                {tags.length > 9 && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="badge badge-lg badge-ghost text-primary hover:bg-primary/10 transition-all lg:hidden"
                  >
                    {showAllTags ? "Show Less" : `+${tags.length - 9} More`}
                  </button>
                )}

                {/* Show remaining tags on desktop */}
                {!showAllTags && tags.length > 9 && (
                  <>
                    {tags.slice(9).map((tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setSelectedTag(selectedTag === tag ? null : tag)
                        }
                        className={`hidden lg:inline-flex badge badge-lg transition-all cursor-pointer capitalize ${
                          selectedTag === tag
                            ? "badge-primary text-primary-content"
                            : "badge-outline text-base-content/70 hover:bg-base-300 hover:text-base-content"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Featured Pillar Section */}
        {!searchQuery && !selectedTag && (
          <section className="w-full py-12 px-4 bg-linear-to-b from-primary/5 to-transparent">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <h2
                  className={`${plusJakartaSans.className} text-3xl font-bold text-base-content`}
                >
                  Featured Guide
                </h2>
                <span className="badge badge-primary badge-lg">
                  Comprehensive
                </span>
              </div>

              {/* Featured Pillar Card */}
              {posts.find((post) => post.isPillar) && (
                <Link
                  href={`/blog/${posts.find((post) => post.isPillar).cluster}`}
                  className="group block card bg-base-100 transition-all duration-300 hover:shadow-sm border-2 border-primary/20"
                >
                  <div className="card-body p-8 md:p-10">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-sm text-base-content/60 mb-4">
                          <time
                            dateTime={
                              posts.find((post) => post.isPillar).frontmatter
                                .date
                            }
                          >
                            {format(
                              new Date(
                                posts.find((post) => post.isPillar).frontmatter
                                  .date,
                              ),
                              "MMM d, yyyy",
                            )}
                          </time>
                          <span>•</span>
                          <span>
                            {posts.find((post) => post.isPillar).readingTime}{" "}
                            min read
                          </span>
                          <span>•</span>
                          <span className="text-primary font-semibold">
                            Pillar Article
                          </span>
                        </div>

                        <h3
                          className={`${plusJakartaSans.className} text-2xl md:text-3xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors`}
                        >
                          {
                            posts.find((post) => post.isPillar).frontmatter
                              .title
                          }
                        </h3>

                        {posts.find((post) => post.isPillar).frontmatter
                          .description && (
                          <p className="text-base md:text-lg text-base-content/70 mb-6 leading-relaxed">
                            {
                              posts.find((post) => post.isPillar).frontmatter
                                .description
                            }
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-primary font-semibold group-hover:gap-4 transition-all">
                          <span>Read comprehensive guide</span>
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

                      <div className="hidden md:block text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                        📚
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="w-full py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`${plusJakartaSans.className} text-3xl font-bold mb-8 text-base-content`}
            >
              {searchQuery || selectedTag ? "Search Results" : "All Articles"}
            </h2>

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
      className="group card bg-base-100 transition-all duration-300 hover:shadow-sm border border-primary/20"
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
        {Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="badge badge-sm badge-outline badge-primary"
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
