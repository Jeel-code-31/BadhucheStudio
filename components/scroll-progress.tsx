"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Confirms we are now on the client side
    
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Return null or an empty div on the server to prevent the mismatch
  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent">
      <div
        className="h-full transition-all duration-100 ease-out will-change-[width]"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #C2542D 0%, #B8963F 100%)"
        }}
      />
    </div>
  );
}