// src/components/ProductCard.tsx
import React from "react";
import { Product } from "../types";

type Props = {
  product: Product;
  onClick?: () => void;
};

const badgeStyles: Record<string, string> = {
  人気: "bg-[#4682B4]/10 text-[#4682B4] border border-[#4682B4]/20",
  定番: "bg-slate-100 text-slate-600 border border-slate-200",
  季節限定: "bg-amber-50 text-amber-700 border border-amber-200",
  おすすめ: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  食事系: "bg-rose-50 text-rose-700 border border-rose-200",
};

const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-64 overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {product.badge && (
          <div className="absolute left-3 top-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                badgeStyles[product.badge] ||
                "bg-white/90 text-slate-700 border border-slate-200"
              }`}
            >
              #{product.badge}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1 p-4">
        <h3 className="text-base font-semibold text-slate-800">
          {product.name}
        </h3>

        {product.description && (
          <p className="line-clamp-1 text-sm text-slate-500">
            {product.description}
          </p>
        )}
      </div>
    </button>
  );
};

export default ProductCard;
