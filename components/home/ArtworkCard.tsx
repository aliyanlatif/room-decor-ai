import { ArtworkSuggestionResponse } from "@/types";

interface ArtworkCardProps {
  artwork: ArtworkSuggestionResponse;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <a
        href={artwork.image_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          className="relative h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(${artwork.image_url})`,
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            <h4 className="text-white font-semibold text-lg">
              {artwork.title}
            </h4>
          </div>
        </div>
      </a>

      {/* Reasoning section */}
      <div className="p-4 bg-white">
        <p className="text-gray-700 text-sm leading-relaxed">
          {artwork.answer}
        </p>
      </div>
    </div>
  );
}
