"use client";

import { useState } from "react";
import Image from "next/image";

export function ProfileImage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent/60 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background/50 backdrop-blur-sm">
        <Image
          src="/profile.jpg"
          alt="Kim G. Cañedo"
          width={160}
          height={160}
          className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
          onLoadingComplete={() => setIsLoaded(true)}
          priority
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-surface/30 animate-pulse" />
        )}
      </div>
    </div>
  );
}
