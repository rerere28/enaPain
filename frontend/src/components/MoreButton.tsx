import React, { useId } from "react";

interface MoreButtonProps {
  onClick?: () => void;
  href?: string;
  text?: string;
  target?: "_self" | "_blank";
  rel?: string;
}

const MoreButton: React.FC<MoreButtonProps> = ({
  onClick,
  href,
  text = "More",
  target = "_self",
  rel,
}) => {
  const maskId = useId();

  const content = (
    <>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 50"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id={maskId}>
            <rect width="200" height="50" fill="white" />
            <circle cx="0" cy="0" r="14" fill="black" />
            <circle cx="200" cy="0" r="14" fill="black" />
            <circle cx="0" cy="50" r="14" fill="black" />
            <circle cx="200" cy="50" r="14" fill="black" />
          </mask>
        </defs>

        <rect
          width="200"
          height="50"
          fill="steelblue"
          mask={`url(#${maskId})`}
        />

        <rect
          x="5"
          y="5"
          width="190"
          height="40"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1"
        />
      </svg>

      <span
        className="relative z-10 flex items-center gap-2 font-normal text-lg text-white"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        {text}
        <span className="transform -translate-x-1.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          →
        </span>
      </span>
    </>
  );

  const baseClass =
    "relative inline-block px-8 py-2 overflow-hidden transition-all duration-300 hover:bg-steelblue group";

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={baseClass}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {content}
    </button>
  );
};

export default MoreButton;
