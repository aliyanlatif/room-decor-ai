/**
 * Utility functions for the application
 */

/**
 * Smoothly scroll to a target element with easing animation
 * @param element - Target HTML element to scroll to
 * @param duration - Duration of scroll animation in milliseconds
 */
export const smoothScrollTo = (
  element: HTMLElement | null,
  duration: number = 1500
): void => {
  if (!element) return;

  const targetPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function for smooth animation (easeInOutCubic)
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * easeInOutCubic);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Convert brightness value from 0-255 scale to 0-100 percentage
 * @param brightness - Brightness value (0-255)
 * @returns Percentage value (0-100)
 */
export const convertBrightnessToPercentage = (brightness: number): number => {
  return (brightness / 255) * 100;
};

/**
 * Format currency value
 * @param amount - Amount to format
 * @param currency - Currency symbol (default: $)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = "$"): string => {
  return `${currency}${amount.toFixed(2)}`;
};

/**
 * Delay execution for a specified time
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

