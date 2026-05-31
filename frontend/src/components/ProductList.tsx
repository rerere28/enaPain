import React, { useEffect, useMemo, useState } from "react";
import { Product, ProductCategory } from "../types";
import FadeInSection from "./FadeInSection";

type Props = {
  products: Product[];
};

const categories: { id: ProductCategory; label: string; subcopy: string }[] = [
  {
    id: "viennoiserie",
    label: "Viennoiserie",
    subcopy:
      "クロワッサンやデニッシュなど、軽やかな層と香りを楽しめるラインナップ。",
  },
  {
    id: "pain",
    label: "Pain",
    subcopy: "バゲットやリュスティックなど、食事に寄り添うハード系のパン。",
  },
  {
    id: "sweet",
    label: "Sweet",
    subcopy: "クリームパンやあんぱんなど、やさしい甘さを楽しめるパンたち。",
  },
  {
    id: "savory",
    label: "Savory",
    subcopy: "惣菜デニッシュやお食事パンなど、満足感のあるラインナップ。",
  },
  {
    id: "sandwich",
    label: "Sandwich",
    subcopy: "具材とのバランスを考えて仕立てた、満足感のあるサンドイッチ。",
  },
];

const badgeStyles: Record<string, string> = {
  人気: "bg-[#4682B4]/10 text-[#4682B4] border border-[#4682B4]/20",
  定番: "bg-slate-100 text-slate-600 border border-slate-200",
  季節限定: "bg-amber-50 text-amber-700 border border-amber-200",
  おすすめ: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  食事系: "bg-rose-50 text-rose-700 border border-rose-200",
};

const ProductList: React.FC<Props> = ({ products }) => {
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>("viennoiserie");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalImageType, setModalImageType] = useState<"image" | "crumb">(
    "crumb",
  );

  useEffect(() => {
    if (!selectedProduct) return;

    setModalImageType("image");
    const timer = window.setTimeout(() => {
      if (selectedProduct.crumbImageUrl) {
        setModalImageType("crumb");
      }
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [selectedProduct]);

  useEffect(() => {
    const categoryIds: ProductCategory[] = [
      "viennoiserie",
      "pain",
      "sweet",
      "savory",
      "sandwich",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      let current: ProductCategory = "viennoiserie";
      for (const id of categoryIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (section.offsetTop <= scrollPosition) {
          current = id;
        }
      }
      setActiveCategory(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategory = (id: ProductCategory) => {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const grouped = useMemo(() => {
    return {
      viennoiserie: products.filter((p) => p.category === "viennoiserie"),
      pain: products.filter((p) => p.category === "pain"),
      sweet: products.filter((p) => p.category === "sweet"),
      savory: products.filter((p) => p.category === "savory"),
      sandwich: products.filter((p) => p.category === "sandwich"),
    };
  }, [products]);

  const sectionTitle = (label: string, subcopy: string) => (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
            Category
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-800 md:text-3xl">
            {label}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">{subcopy}</p>
        </div>
        <div className="hidden h-px flex-1 bg-slate-200 md:block" />
      </div>
    </div>
  );

  const ProductShowcaseCard = ({ product }: { product: Product }) => (
    <button
      onClick={() => {
        setSelectedProduct(product);
        setModalImageType(product.crumbImageUrl ? "crumb" : "image");
      }}
      className="group block w-full overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      type="button"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
              product.crumbImageUrl ? "group-hover:opacity-0" : ""
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-sm text-slate-400">
            No Image
          </div>
        )}

        {product.crumbImageUrl && (
          <img
            src={product.crumbImageUrl}
            alt={`${product.name} 断面`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        {product.badge && (
          <div className="absolute left-3 top-3 flex gap-2">
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

      <div className="space-y-2 p-4">
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

  return (
    <div
      className="min-h-screen bg-[#f8f6f2] text-slate-800"
      style={{ backgroundImage: "url('/images/bg/bg-1.jpg')" }}
    >
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-12">
          <h1 className="mt-24 text-4xl font-semibold leading-tight text-slate-900 md:text-6xl text-center italic font-playfair">
            Products
          </h1>

          <div className="mt-4">
            <p className="text-sm leading-7 text-slate-600">
              ※
              価格は店頭にてご確認ください。商品ラインナップは季節やその日の状況によって変わる場合があります。
            </p>
          </div>
        </div>
      </section>

      <div className="sticky top-28 z-30 mx-auto -mt-6 mb-10 max-w-7xl px-6 md:px-10">
        <div className="overflow-x-auto rounded-full bg-white/90 px-1 py-1 shadow-sm ring-1 ring-slate-200 backdrop-blur-md">
          <div className="flex w-max gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  scrollToCategory(category.id);
                }}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category.id
                    ? "border-[#4682B4] bg-[#4682B4] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#4682B4] hover:text-[#4682B4]"
                }`}
                type="button"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-16 px-6 pb-20 md:px-10">
        <section id="viennoiserie" className="scroll-mt-44">
          {sectionTitle(categories[0].label, categories[0].subcopy)}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {grouped.viennoiserie.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 80}>
                <ProductShowcaseCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="pain" className="scroll-mt-44">
          {sectionTitle(categories[1].label, categories[1].subcopy)}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {grouped.pain.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 80}>
                <ProductShowcaseCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="sweet" className="scroll-mt-44">
          {sectionTitle(categories[2].label, categories[2].subcopy)}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {grouped.sweet.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 80}>
                <ProductShowcaseCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="savory" className="scroll-mt-44">
          {sectionTitle(categories[3].label, categories[3].subcopy)}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {grouped.savory.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 80}>
                <ProductShowcaseCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="sandwich" className="scroll-mt-44">
          {sectionTitle(categories[4].label, categories[4].subcopy)}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {grouped.sandwich.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 80}>
                <ProductShowcaseCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="閉じる"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/55 text-slate-700 shadow-sm ring-1 ring-white/60 backdrop-blur-sm transition hover:bg-white/75"
              type="button"
            >
              ×
            </button>

            <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-2">
              <div className="relative min-h-[320px] bg-slate-100">
                {selectedProduct.imageUrl ? (
                  <img
                    src={
                      modalImageType === "crumb" &&
                      selectedProduct.crumbImageUrl
                        ? selectedProduct.crumbImageUrl
                        : selectedProduct.imageUrl
                    }
                    alt={
                      modalImageType === "crumb" &&
                      selectedProduct.crumbImageUrl
                        ? `${selectedProduct.name} 断面`
                        : selectedProduct.name
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    No Image
                  </div>
                )}

                {selectedProduct.badge && (
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                        badgeStyles[selectedProduct.badge] ||
                        "bg-white/90 text-slate-700 border border-slate-200"
                      }`}
                    >
                      #{selectedProduct.badge}
                    </span>
                  </div>
                )}

                {selectedProduct.crumbImageUrl && (
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4">
                    <button
                      onClick={() =>
                        setModalImageType(
                          modalImageType === "image" ? "crumb" : "image",
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/55 text-slate-700 shadow-sm ring-1 ring-white/60 backdrop-blur-sm transition hover:bg-white/75"
                      type="button"
                    >
                      ‹
                    </button>

                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full transition ${
                          modalImageType === "image"
                            ? "bg-[#4682B4]"
                            : "bg-white/80 ring-1 ring-slate-300"
                        }`}
                      />
                      <span
                        className={`h-2 w-2 rounded-full transition ${
                          modalImageType === "crumb"
                            ? "bg-[#4682B4]"
                            : "bg-white/80 ring-1 ring-slate-300"
                        }`}
                      />
                    </div>

                    <button
                      onClick={() =>
                        setModalImageType(
                          modalImageType === "image" ? "crumb" : "image",
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/55 text-slate-700 shadow-sm ring-1 ring-white/60 backdrop-blur-sm transition hover:bg-white/75"
                      type="button"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                    Product Detail
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-slate-900">
                    {selectedProduct.name}
                  </h3>

                  {selectedProduct.french_name && (
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">
                      {selectedProduct.french_name}
                    </p>
                  )}

                  {selectedProduct.description && (
                    <p className="mt-6 text-base leading-8 text-slate-600">
                      {selectedProduct.description}
                    </p>
                  )}

                  <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
                    {selectedProduct.featureText && (
                      <div>
                        <p className="font-medium text-slate-800">こだわり</p>
                        <p>{selectedProduct.featureText}</p>
                      </div>
                    )}

                    {selectedProduct.recommendation && (
                      <div>
                        <p className="font-medium text-slate-800">
                          おすすめの楽しみ方
                        </p>
                        <p>{selectedProduct.recommendation}</p>
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-slate-800">ご案内</p>
                      <p>
                        価格は店頭にてご確認ください。商品ラインナップは日によって異なる場合があります。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-5">
                  <p className="text-sm text-slate-500">
                    背景クリックか右上の×で閉じられます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
