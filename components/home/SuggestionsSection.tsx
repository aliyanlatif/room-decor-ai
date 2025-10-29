import { AnalysisResponse } from "@/types";
import ArtworkCard from "./ArtworkCard";

interface SuggestionsSectionProps {
  analysisResult: AnalysisResponse;
}

export default function SuggestionsSection({
  analysisResult,
}: SuggestionsSectionProps) {
  const matchingCount = analysisResult.reasoning?.artworks?.matching?.length || 0;
  
  return (
    <section className="min-h-screen flex flex-col items-start justify-center py-8">
      <div className="container mx-auto max-w-7xl px-4 w-full">
        {/* Matching Suggested Artwork - First Row */}
        <div className="rounded-xl shadow-2xl p-6 md:p-8 mb-12">
          <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
            Matching Suggested Artwork
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {analysisResult.reasoning?.artworks?.matching?.map(
              (item, index) => (
                <ArtworkCard key={item.id} artwork={item} index={index} />
              )
            )}
          </div>
        </div>

        {/* Contrast Suggested Artwork - Second Row */}
        <div className="rounded-xl shadow-2xl p-6 md:p-8">
          <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
            Contrast Suggested Artwork
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {analysisResult.reasoning?.artworks?.contrast?.map(
              (item, index) => (
                <ArtworkCard 
                  key={item.id} 
                  artwork={item} 
                  index={matchingCount + index} 
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
