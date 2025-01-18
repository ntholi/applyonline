"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    function listener(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    // Add listener
    media.addEventListener("change", listener);
    
    return () => {
      // Clean up listener
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
