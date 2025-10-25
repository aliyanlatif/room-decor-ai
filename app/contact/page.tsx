"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

        {/* Contact Content Section */}
        <section className="min-h-screen flex items-start justify-center pt-8">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-12 border border-white/30">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg text-left">
                Contact Us
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/90 border-2 border-transparent focus:border-white focus:bg-white text-gray-800 placeholder-gray-500 focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/90 border-2 border-transparent focus:border-white focus:bg-white text-gray-800 placeholder-gray-500 focus:outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-2 border-transparent focus:border-white focus:bg-white text-gray-800 placeholder-gray-500 focus:outline-none transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-white/90 text-gray-800 rounded-full font-normal text-lg shadow-lg transition-all duration-300 border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg text-center font-medium ${
                      submitStatus.type === "success"
                        ? "bg-green-500/90 text-white"
                        : "bg-red-500/90 text-white"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
              </form>
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
