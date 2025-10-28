import { AnalysisResponse } from "@/types";
import ArtworkCard from "./ArtworkCard";
import TypewriterText from "@/components/ui/TypewriterText";

interface SuggestionsSectionProps {
  analysisResult: AnalysisResponse;
}

export default function SuggestionsSection({
  analysisResult,
}: SuggestionsSectionProps) {
  return (
    <>
      <section className="min-h-screen flex items-start justify-center py-1">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
              Matching Suggested Artwork
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {analysisResult.artworks?.matching?.map((item, index) => (
                <ArtworkCard key={item.id} artwork={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-10 d-block" />

        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
              Contrast Suggested Artwork
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {analysisResult.artworks?.contrast?.map((item, index) => (
                <ArtworkCard key={item.id} artwork={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-start justify-center py-1">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-xl shadow-2xl p-6 md:p-8">
            <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
              Why We Suggested These Artworks
            </h3>
            <p className="text-white text-lg">
              <TypewriterText text={analysisResult.reasoning} speed={30} />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
