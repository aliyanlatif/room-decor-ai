"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpeg')",
        }}
      ></div>

      {/* Semi-transparent Overlay */}
      <div className="fixed inset-0 z-10 bg-black/60 dark:bg-black/70"></div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 pt-8 max-w-7xl">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
            >
              AI Room Decor
            </Link>
            <div className="flex gap-8 items-center">
              <Link
                href="/"
                className="text-white hover:text-gray-200 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-200 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-200 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </nav>
        </header>

        {/* About Content Section */}
        <section className="min-h-screen flex items-start justify-center pt-8">
          <div className="container mx-auto max-w-9xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-8 border border-white/30">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg text-left">
                About Us
              </h1>

              <div className="space-y-5 text-white text-base leading-relaxed">
                <p>
                  Welcome to <span className="font-semibold">Art.Decor.AI</span>,{" "}
                  where the power of Artificial Intelligence meets your
                  personal sense of style to transform the way you decorate your
                  home.
                </p>

                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Our Vision: Perfect Décor, Effortlessly
                  </h2>
                  <p>
                    We believe decorating your space should be simple,
                    inspiring, and fun. No more endless scrolling,
                    second-guessing, or mismatched designs. Art.Decor.AI acts as
                    your personal AI home stylist, helping you find décor and
                    wall art that truly fits your space, your taste, and your
                    lifestyle.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-2">How It Works</h2>
                  <p className="mb-3">
                    Our smart AI understands your space and preferences through
                    three easy inputs:
                  </p>

                  <div className="space-y-3 pl-4">
                    <div>
                      <p className="font-semibold text-sm">📸 Photo Upload</p>
                      <p className="mt-1 text-sm">
                        Share a picture of your room, and our AI analyzes its
                        colors, lighting, and layout to get a feel for your
                        environment.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm">
                        ✍️ Text Description
                      </p>
                      <p className="mt-1 text-sm">
                        Describe your vision in your own words, like "a cozy
                        Scandinavian living room with beige tones" or "modern
                        art for my office wall."
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm">🎤 Voice Query</p>
                      <p className="mt-1 text-sm">
                        Prefer to talk it out? Simply speak your request, such
                        as "Show me minimalist art for my bedroom."
                      </p>
                    </div>
                  </div>

                  <p className="mt-3">
                    From there, Art.Decor.AI instantly interprets your input,
                    studies the details of your room, and curates personalized
                    décor suggestions that complement your style perfectly.
                  </p>
                </div>

                <p>
                  Whether you're refreshing a single wall or redesigning an
                  entire room, we make the process smarter, faster, and more
                  effortless — so you can focus on what truly matters: loving
                  the space you live in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="py-8 text-center text-gray-200 text-sm drop-shadow-md">
          <p>Powered by AI • Designed for your dream space</p>
        </div>
      </div>
    </div>
  );
}
