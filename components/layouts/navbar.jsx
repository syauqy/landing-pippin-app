import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"],
});

export function Navbar({ bg, page }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-40 transition-colors duration-200",
        hasScrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-sm"
          : "bg-base-100"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={clsx(
              "text-3xl md:text-4xl font-bold text-base-content flex items-center gap-2",
              caveat.className
            )}
            aria-label="Pippin Home"
          >
            {/* <img
              src="/logos/app-icon-mix-2.jpg"
              alt="Pippin Mascot"
              className="w-8 h-8 md:w-12 md:h-12 inline-block align-middle rounded-2xl overflow-clip object-cover"
            /> */}
            Pippin
          </Link>

          {/* Desktop Menu */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/check"
              className={clsx(
                page === "check"
                  ? "text-batik-text underline underline-offset-2"
                  : "text-gray-700",
                " hover:text-batik-text font-semibold"
              )}
            >
              Check Your Weton
            </Link>
            <Link
              href="/blog"
              className={clsx(
                page === "blog"
                  ? "text-batik-text underline underline-offset-2"
                  : "text-gray-700",
                " hover:text-batik-text font-semibold"
              )}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={clsx(
                page === "contact"
                  ? "text-batik-text underline underline-offset-2"
                  : "text-gray-700",
                " hover:text-batik-text font-semibold"
              )}
            >
              Contact
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-batik-text">
              Support
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-batik-text">
              About
            </Link>
            <Link href="/weton" className="text-gray-700 hover:text-batik-text">
              Check Your Weton
            </Link>
            <a
              href="https://apps.apple.com/your-app-link"
              className=" px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <AppStore className="w-32" />
            </a>
          </div> */}

          {/* Mobile Menu Button */}
          {/* <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button> */}
        </div>

        {/* Mobile Menu Popover */}
        {/* {isOpen && (
          <div
            className={clsx(
              "md:hidden absolute top-16 left-0 right-0 transition-colors duration-200",
              hasScrolled
                ? "bg-white/90 backdrop-blur-md"
                : bg + "/80 backdrop-blur-md"
            )}
          >
            <div className={clsx("flex flex-col pt-4  shadow-md")}>
              <Link
                href="/check"
                className={clsx(
                  page === "check"
                    ? "text-batik-text bg-batik"
                    : "text-gray-600",
                  "hover:text-batik-text font-semibold text-lg px-4 py-4 active:bg-batik"
                )}
                onClick={() => setIsOpen(false)}
              >
                Check Your Weton
              </Link>
              <Link
                href="/blog"
                className={clsx(
                  page === "blog"
                    ? "text-batik-text bg-batik"
                    : "text-gray-600",
                  "hover:text-batik-text font-semibold text-lg px-4 py-4 active:bg-batik"
                )}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
}
