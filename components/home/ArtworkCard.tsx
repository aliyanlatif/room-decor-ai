import { ArtworkSuggestionResponse } from "@/types";

interface ArtworkCardProps {
  artwork: ArtworkSuggestionResponse;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  return (
    <a
      href={artwork.image_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="relative h-80 bg-cover bg-center rounded-2xl"
        style={{
          backgroundImage: `url(${artwork.image_url})`,
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-white font-semibold text-lg mb-1">
                {artwork.title} by {artwork.brand}
              </h4>
            </div>
            <div className="text-white font-bold text-lg ml-2">
              {artwork.price}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
