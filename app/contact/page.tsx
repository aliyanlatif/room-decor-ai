/**
 * Contact Page - Contact form for user inquiries
 */

"use client";

import React, { useState } from "react";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Button } from "@/app/components/ui/Button";
import { ContactFormData } from "@/app/types";
import { sendContactForm } from "@/app/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await sendContactForm(formData);
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('/background.jpeg')",
        }}
      />

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] -z-10" />

      {/* Content */}
      <div className="relative z-0">
        {/* Header Navigation */}
        <Header />

        {/* Contact Form Section */}
        <section className="min-h-screen flex items-start justify-center pt-20">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-10 border border-white/30">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
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
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="px-12 py-4 text-lg"
                  >
                    {!isSubmitting && "Send Message"}
                  </Button>
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg text-center font-medium ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-400"
                        : "bg-red-100 text-red-800 border border-red-400"
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
        <Footer />
      </div>
    </div>
  );
}
