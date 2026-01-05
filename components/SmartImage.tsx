import React, { useState, useEffect } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;           // The primary source (from JSON)
  fallbackKey?: string;   // Key to determine which Unsplash image to use if src fails ('origin', 'vision', etc.)
  motionProps?: MotionProps; // Framer motion variants and transition props
}

/**
 * SmartImage Component
 * 
 * 1. Tries to load `src` provided in props (e.g. from JSON config).
 * 2. If `src` is empty, immediately uses a curated Unsplash fallback based on `fallbackKey`.
 * 3. If `src` is provided but fails to load (404), switches to the fallback.
 */
export const SmartImage: React.FC<SmartImageProps> = ({ 
  src, 
  fallbackKey = 'default', 
  className, 
  alt, 
  motionProps, 
  ...props 
}) => {
  
  // Curated Unsplash IDs for high-quality fallbacks
  // These serve as the "Theme" defaults if no custom image is provided
  const FALLBACKS: Record<string, string> = {
    'origin': 'https://images.unsplash.com/photo-1478436127897-769e1a3f0c7e?q=80&w=2535&auto=format&fit=crop', // Shrine / Nature / Moss
    'philosophy': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Zen / Abstract / Stone
    'vision': 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop', // Tech / Network / Gold
    'default': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop'  // General Landscape
  };

  const getFallbackUrl = (key: string) => FALLBACKS[key] || FALLBACKS['default'];

  // Determine initial source: if src is empty string, use fallback immediately
  const initialSrc = (src && src.trim() !== "") ? src : getFallbackUrl(fallbackKey);
  
  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);

  // If the `src` prop changes (e.g. language switch or data update), reset the state
  useEffect(() => {
    const newSrc = (src && src.trim() !== "") ? src : getFallbackUrl(fallbackKey);
    setCurrentSrc(newSrc);
  }, [src, fallbackKey]);

  const handleError = () => {
    // Prevent infinite loop if fallback itself fails (though unlikely with Unsplash)
    const fallback = getFallbackUrl(fallbackKey);
    if (currentSrc !== fallback) {
      console.warn(`[SmartImage] Image failed to load: ${currentSrc}. Switching to fallback.`);
      setCurrentSrc(fallback);
    }
  };

  return (
    <motion.img
      {...motionProps}
      src={currentSrc}
      alt={alt || "Ko Takahashi Portfolio - Visual Element (Shinjuku/Tokyo)"}
      className={className}
      onError={handleError}
      // Spread other standard HTML img props
      {...props as any} 
    />
  );
};

export default SmartImage;