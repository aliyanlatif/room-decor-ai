import { ForwardedRef, forwardRef } from "react";

const LoadingSpinner = forwardRef(
  (_props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <section
        ref={ref}
        className="min-h-[300px] flex items-center justify-center py-5"
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white" />
          <p className="text-white text-xl mt-6 drop-shadow-lg font-medium">
            Loading Artwork Suggestions...
          </p>
        </div>
      </section>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
