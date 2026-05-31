import React from "react";
import FadeInSection from "./FadeInSection";

const LINE_URL = "https://line.me/R/ti/p/@731tgles";
const PHONE_NUMBER = "042-439-6758";

const ReservationPage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-[#f8f6f2] text-slate-800"
      style={{ backgroundImage: "url('/images/bg/bg-1.jpg')" }}
    >
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-12">
          <h1 className="mt-24 text-center font-playfair text-4xl font-semibold italic leading-tight text-slate-900 md:text-6xl">
            Reservation
          </h1>

          <div className="mx-auto mt-4 max-w-2xl text-center">
            <p className="text-sm leading-7 text-slate-600">
              ご予約・お取り置きは、LINE公式アカウントより承っております。
              <br className="hidden md:block" />
              お電話でも承っておりますが、営業中や製造中は出られない場合がございます。
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 pb-24 md:px-10">
        <FadeInSection>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur-md md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="shrink-0 text-2xl font-semibold tracking-wide text-slate-800">
                  LINE
                </h2>
                <div className="h-px flex-1 bg-[#4682B4]/25" />
              </div>

              <p className="text-sm leading-8 text-slate-600">
                LINEのトーク画面より、 予約フォームへお進みいただけます。
                <br />
                ご予約はご来店日前日12:00まで承っております。
                <br />
                商品のご用意が難しい場合のみ、
                こちらからご連絡させていただきます。
              </p>

              <div className="mt-8">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-[#06C755] px-8 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  LINEで予約する
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/90 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur-md md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="shrink-0 text-2xl font-semibold tracking-wide text-slate-800">
                  TEL
                </h2>
                <div className="h-px flex-1 bg-[#4682B4]/25" />
              </div>

              <p className="text-sm leading-8 text-slate-600">
                お電話でもご予約を承っております。
                <br />
                ただ、営業中や製造中は作業の都合ですぐに
                <br />
                出られないことがございます。
                <br />
                つながらない場合は、お時間をおいておかけ直しいただくか、
                <br />
                LINEからのご予約をご利用いただけますとスムーズです。
              </p>

              <div className="mt-8">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex rounded-full border border-[#4682B4]/40 px-8 py-3 text-sm font-medium text-[#4682B4] transition hover:-translate-y-0.5 hover:bg-[#4682B4] hover:text-white"
                >
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={120}>
          <div className="mt-8 rounded-[2rem] bg-white/70 p-6 text-sm leading-8 text-slate-500 shadow-sm ring-1 ring-slate-200 backdrop-blur-md">
            <p>
              ※ 商品や日によっては、ご希望に添えない場合がございます。
              あらかじめご了承ください。
            </p>
          </div>
        </FadeInSection>
      </main>
    </div>
  );
};

export default ReservationPage;
