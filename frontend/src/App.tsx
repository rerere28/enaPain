import "./css/style.css";
import React, { useState, useEffect } from "react";
import { keyVisuals, storeInfo } from "./data/mockData";
import Header from "./components/Header";
import KeyVisualSlider from "./components/KeyVisualSlider";
import StoreInfo from "./components/StoreInfo";
import Footer from "./components/Footer";
import { Product } from "./types";
import Titles from "./components/Titles";
import MoreButton from "./components/MoreButton";
import InstagramFeed from "./components/InstagramFeed";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductList from "./components/ProductList";
import TopProductFeature from "./components/TopProductFeature";
import ReservationPage from "./components/ReservationPage";

export type Page = "home" | "productList" | "reservation";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));

      const data: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      console.log("Firestore products:", data);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="App font-noto-sans-jp min-h-screen bg-cover bg-center text-sm"
      style={{ backgroundImage: "url('/images/bg/bg-1.jpg')" }}
    >
      <Header setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === "home" && (
          <>
            <KeyVisualSlider slides={keyVisuals} />

            <section className="p-5">
              <Titles
                titles={{
                  titleJP: "シェフからのご挨拶",
                  titleEN: "Message",
                }}
              />
              <div className="text-center font-noto-serif-jp px-4 md:px-8 lg:px-16 space-y-2 md:space-y-3 text-slate-800">
                <p className="text-[10px] md:text-xs lg:text-sm">
                  小さい頃からパンが大好きでした。
                </p>

                <p className="text-[10px] md:text-xs lg:text-sm">
                  日曜の朝には、母が近所のパン屋さんで焼きたてのパンを買ってきてくれ、
                  <br />
                  家族で囲む食卓がいつも特別な時間になっていました。
                </p>

                <p className="text-[10px] md:text-xs lg:text-sm">
                  あの頃のように「パンがあるだけで幸せな気持ちになれる空間」を届けたい
                  <br />
                  ――そんな思いでパン作りを学び始め、気づけば十数年が経ちました。
                </p>

                <p className="text-[10px] md:text-xs lg:text-sm pt-2">
                  ようやく自分の納得のいく形に少しずつ近づいてきた今、
                  <br />
                  そのパンを皆さまに味わっていただきたいと思い、
                  <br className="block md:hidden" />
                  この度お店をオープンいたしました。
                </p>

                <p className="text-[10px] md:text-xs lg:text-sm">
                  まだまだ学ぶことは多く、
                  <br />
                  これからが本当の修行の始まりだと思っております。
                </p>

                <p className="text-[10px] md:text-xs lg:text-sm">
                  ひとつひとつ心を込めて焼いたパンで、
                  <br />
                  皆さまの日常に小さな幸せを添えられるよう努めてまいります。
                </p>
              </div>

              <div className="text-center pt-4 md:pt-5 font-noto-serif-jp text-[10px] md:text-xs lg:text-sm text-slate-800">
                éna pain 江並 啓太
              </div>
            </section>

            <section className="px-3 py-5 md:px-6 md:py-8">
              <Titles
                titles={{
                  titleJP: "お知らせ",
                  titleEN: "News",
                }}
              />
              <InstagramFeed />
              <div className="flex justify-center items-center pt-8">
                <MoreButton
                  href="https://www.instagram.com/ena_pain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  text="Instagram"
                />
              </div>
            </section>

            <section className="p-3 md:p-6">
              <Titles
                titles={{
                  titleJP: "商品紹介",
                  titleEN: "Products",
                }}
              />

              <TopProductFeature />

              <div className="flex justify-center pt-8">
                <MoreButton onClick={() => setCurrentPage("productList")} />
              </div>
            </section>

            <section className="p-3">
              <StoreInfo info={storeInfo} />
            </section>
          </>
        )}
        {currentPage === "productList" && <ProductList products={products} />}
        {currentPage === "reservation" && <ReservationPage />}
        <Footer />
      </main>
    </div>
  );
};

export default App;
