import Link from "next/link";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "800",
  subsets: ["latin"],
});

export default function NotFoundPage() {
  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-b from-[#F8F7F4] to-[#E9E6DF] text-[#2D2A26] ${plusJakartaSans.className}`}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow py-16 px-5">
        <div className="bg-white/80 rounded-3xl shadow-lg p-10 flex flex-col items-center max-w-md w-full">
          <img
            src="/illustrations/pippin-onsen-300.png"
            alt="Pippin mascot lost"
            className="w-full mb-6 rounded-2xl drop-shadow object-contain"
          />
          <h1 className="text-6xl font-bold mb-2 tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-[#6B665B]">
            Oops! Page not found
          </h2>
          <p className="text-[#6B665B] text-center mb-8">
            Looks like you wandered off the path.
            <br />
            Let’s get you back to a calmer mind.
          </p>
          <Link
            href="/"
            className="bg-[#B6A16B] hover:bg-[#A08B5A] text-white rounded-xl px-6 py-2 font-semibold transition-colors duration-200 shadow"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
