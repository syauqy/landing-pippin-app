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
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />
      <div className="flex flex-col items-center justify-center grow py-16 px-5">
        <div className="bg-white/80 rounded-3xl shadow-lg p-10 flex flex-col items-center max-w-md w-full">
          <img
            src="/illustrations/pippin-onsen-300.png"
            alt="Pippin mascot lost"
            className="w-full mb-6 rounded-2xl drop-shadow object-contain"
          />
          <h1 className="text-6xl font-bold mb-2 tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-base-content/60">
            Oops! Page not found
          </h2>
          <p className="text-base-content/60 text-center mb-8">
            Looks like you wandered off the path.
            <br />
            Let’s get you back to a calmer mind.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
