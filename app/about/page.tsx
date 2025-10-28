/**
 * About Page - Information about Room Decor AI
 */

"use client";

import React from "react";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { ABOUT_CONTENT } from "@/app/constants";

export default function AboutPage() {
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

        {/* About Content Section */}
        <section className="min-h-screen flex items-start justify-center pt-20">
          <div className="container mx-auto max-w-9xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-8 border border-white/30">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg text-left">
                {ABOUT_CONTENT.title}
              </h1>

              <div className="space-y-5 text-white text-base leading-relaxed">
                {ABOUT_CONTENT.sections.map((section, index) => (
                  <div key={index}>
                    {section.heading && (
                      <h2 className="text-xl font-bold mb-2">
                        {section.heading}
                      </h2>
                    )}
                    {section.text && (
                      <p dangerouslySetInnerHTML={{ __html: section.text }} />
                    )}
                    {section.inputs && (
                      <>
                        <p className="mb-3">{section.text}</p>
                        <div className="space-y-3 pl-4">
                          {section.inputs.map((input, inputIndex) => (
                            <div key={inputIndex}>
                              <p className="font-semibold text-sm">
                                {input.icon} {input.title}
                              </p>
                              <p className="mt-1 text-sm">
                                {input.description}
                              </p>
                            </div>
                          ))}
                        </div>
                        {section.conclusion && (
                          <p className="mt-3">{section.conclusion}</p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
