// src/components/KeyVisualSlider.tsx
import React, { useEffect, useState } from "react";

type KeyVisual = {
  id: number;
  imageUrl: string;
  alt: string;
};

type Props = {
  slides: KeyVisual[];
};

const AUTO_INTERVAL = 7000;

const KeyVisualSlider: React.FC<Props> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fadeInTimer = window.setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => window.clearTimeout(fadeInTimer);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_INTERVAL);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      id="slide_wrapp"
      className={`relative h-[78vh] min-h-[520px] w-full overflow-hidden transition-opacity duration-[1600ms] ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.alt}
              className={`h-full w-full object-cover transition-transform ease-linear ${
                isActive
                  ? "scale-110 duration-[7000ms]"
                  : "scale-100 duration-[1200ms]"
              }`}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-20 text-center font-playfair">
        <h2 className="mb-3 text-4xl text-white drop-shadow-lg md:text-6xl">
          「買ってきたよ！」
        </h2>
        <div className="text-lg text-white/95 drop-shadow-lg md:text-2xl">
          シェアしたくなる焼きたての香り。
        </div>
      </div>
    </div>
  );
};

export default KeyVisualSlider;
