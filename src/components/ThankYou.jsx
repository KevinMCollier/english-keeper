// src/ThankYou.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import useLangLink from "../hooks/useLangLink";

export default function ThankYou() {
  const ln = useLangLink();
  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl text-center">
          <h1 className="font-display font-extrabold text-midnight-navy text-3xl sm:text-4xl mb-4">
            Thank you! 🎉
          </h1>
          <p className="text-graphite text-lg">
            Your message has been sent. I’ll get back to you soon.
          </p>

          <a
            href={ln("")}
            className="inline-block mt-8 px-6 py-3 rounded-lg font-semibold border border-graphite text-graphite hover:bg-orange hover:text-off-white transition"
          >
            Back to homepage
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
