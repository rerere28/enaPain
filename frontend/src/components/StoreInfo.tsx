import React from "react";

type StoreInfoType = {
  name: string;
  address: string;
  phone: string;
  instagram?: string;
};

type Props = {
  info: StoreInfoType;
};

const StoreInfo: React.FC<Props> = ({ info }) => {
  return (
    <div className="p-6 mt-6 flex flex-col md:flex-row gap-6 text-slate-800">
      {/* 左側：店舗情報 */}
      <div className="md:w-1/2">
        <h2 className="text-xl font-bold mb-4">{info.name}</h2>

        <ul className="space-y-3">
          <li className="border-b border-dashed pb-2">
            <span className="font-semibold">営業時間:</span>{" "}
            6:30〜18:00（売り切れ次第終了）
          </li>
          <li className="border-b border-dashed pb-2">
            <span className="font-semibold">定休日:</span> 日曜日 月曜日
          </li>
          <li className="border-b border-dashed pb-2">
            <span className="font-semibold">住所:</span> {info.address}
          </li>
          <li className="border-b border-dashed pb-2">
            <span className="font-semibold">アクセス:</span>{" "}
            西武池袋線保谷駅より徒歩8分
          </li>
        </ul>
      </div>

      {/* 右側：地図 */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d809.5522138766597!2d139.562016!3d35.745671!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018ef003ef02e8d%3A0xc1bdb778c021ddfa!2zw6luYSBwYWluIOOBiOOBquOBseOCkw!5e0!3m2!1sja!2sjp!4v1779673442935!5m2!1sja!2sjp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default StoreInfo;
