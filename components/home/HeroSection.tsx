interface HeroSectionProps {
  onStartClick: () => void;
}

export default function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
          AI Room Decor
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-lg max-w-3xl mx-auto">
          Transform and elevate your space with AI-powered designs.
        </p>
        <button
          onClick={onStartClick}
          className="px-12 py-4 bg-white/90 text-gray-800 rounded-full font-medium text-lg shadow-lg transition-all duration-300 border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white backdrop-blur-sm"
        >
          Start Now
        </button>
      </div>
    </section>
  );
}
