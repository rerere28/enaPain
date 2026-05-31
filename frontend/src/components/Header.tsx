// src/components/Header.tsx
import React, { useEffect, useState } from "react";

type HeaderProps = {
  setCurrentPage: (page: "home" | "productList" | "reservation") => void;
};

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-white/85 text-slate-800 shadow-md backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 md:px-12 md:py-8">
        {/* ロゴ左 */}
        <h1 className="cursor-pointer" onClick={() => setCurrentPage("home")}>
          <img
            src="/images/logo/logo5.png"
            className={`w-auto transition-all duration-500 ${
              isScrolled
                ? "h-12 opacity-90 drop-shadow-sm"
                : "h-24 opacity-100 drop-shadow-xl bg-white/15"
            }`}
            alt="éna pain ロゴ"
          />
        </h1>

        {/* 右メニュー */}
        <div className="hidden md:flex items-center gap-8">
          <button
            className={`text-sm tracking-[0.18em] transition ${
              isScrolled
                ? "text-slate-700 hover:text-steelblue"
                : "text-white/90 hover:text-white/50"
            }`}
            onClick={() => setCurrentPage("home")}
            type="button"
          >
            HOME
          </button>
          <button
            className={`text-sm tracking-[0.18em] transition ${
              isScrolled
                ? "text-slate-700 hover:text-steelblue"
                : "text-white/90 hover:text-white/50"
            }`}
            onClick={() => setCurrentPage("productList")}
            type="button"
          >
            PRODUCTS
          </button>
          <button
            className={`text-sm tracking-[0.18em] transition ${
              isScrolled
                ? "text-slate-700 hover:text-steelblue"
                : "text-white/90 hover:text-white"
            }`}
            onClick={() => setCurrentPage("reservation")}
            type="button"
          >
            RESERVATION
          </button>
        </div>

        {/* モバイルハンバーガー */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
              isScrolled
                ? "bg-slate-200/80 text-slate-700 hover:bg-slate-300/80"
                : "bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
            }`}
            aria-label="メニューを開く"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="mx-4 mb-3 rounded-2xl bg-white/50 p-4 text-slate-800 shadow-lg backdrop-blur-md md:hidden">
          <div className="flex flex-col space-y-2">
            <button
              className="text-left text-sm tracking-[0.12em] transition hover:text-steelblue"
              onClick={() => {
                setCurrentPage("home");
                setMenuOpen(false);
              }}
              type="button"
            >
              HOME
            </button>
            <button
              className="text-left text-sm tracking-[0.12em] transition hover:text-steelblue"
              onClick={() => {
                setCurrentPage("productList");
                setMenuOpen(false);
              }}
              type="button"
            >
              PRODUCTS
            </button>
            <button
              className="text-left text-sm tracking-[0.12em] transition hover:text-steelblue"
              onClick={() => {
                setCurrentPage("reservation");
                setMenuOpen(false);
              }}
              type="button"
            >
              RESERVATION
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
