import Link from "next/link";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

export default function NotFoundPage() {
  return (
    <div className="h-[100svh] flex flex-col bg-[#F0F5F1] text-[#3A4D39] relative">
      <Navbar bg={"bg-[#F0F5F1]"} />
      <div className="flex flex-col items-center justify-center flex-grow py-12 px-5">
        <div className="bg-base-100 border border-[#3A4D39] rounded-2xl shadow-md p-8 flex flex-col items-center">
          <h1 className="text-5xl font-bold text-batik-black mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-batik-black mb-4">
            Lost in the Calm
          </h2>
          <p className="text-base-content text-center mb-6">
            Let&apos;s get you back to tracking your subscriptions and finding
            your financial calm.
          </p>
          <Link
            href="/"
            className="btn border-batik-border text-batik-text rounded-2xl px-6 py-2 font-semibold"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <Footer bg={"bg-[#F0F5F1]"} />
    </div>
  );
}
