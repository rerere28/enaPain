import React from "react";
import FadeInSection from "./FadeInSection";

type ProductHighlight = {
  name: string;
  image: string;
  description: string;
};

const products: ProductHighlight[] = [
  {
    name: "Croissant",
    image: "/images/croissant_top.JPG",
    description:
      "発酵バターをたっぷり使ったクロワッサン。外はさくっと、中は軽やかな食感です。",
  },
  {
    name: "Seasonal Danish",
    image: "/images/Danish_top.JPG",
    description:
      "季節のフルーツを使ったデニッシュ。素材の味を大切にしたシンプルな仕上がりです。",
  },
  {
    name: "T-Baguette",
    image: "images/T-baguette_top.JPG",
    description:
      "複数の小麦をブレンドし、一晩かけて低温発酵させた生地を使っています。ゆっくりと発酵させることで、小麦本来の甘みと香ばしさをしっかり引き出しました。噛むほどに味わい深い、素材の味を楽しめる一本です。",
  },
];

const TopProducts: React.FC = () => {
  return (
    <div className="space-y-20 py-10">
      {products.map((p, i) => (
        <FadeInSection key={i} delay={i * 120}>
          <div
            key={i}
            className={`grid items-start gap-10 md:grid-cols-2 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* 画像 */}
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img
                src={p.image}
                alt={p.name}
                className="w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            {/* 説明 */}
            <div className="mx-auto max-w-xl self-start pt-1">
              <div className="flex items-center gap-4">
                <h3 className="shrink-0 text-2xl font-semibold tracking-wide text-slate-800">
                  {p.name}
                </h3>
                <div className="h-px flex-1 bg-slate-300" />
              </div>

              <p className="mt-6 text-sm leading-8 text-slate-600">
                {p.description}
              </p>
            </div>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
};

export default TopProducts;
