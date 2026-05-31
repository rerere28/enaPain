import React from "react";
import { TitlesType } from "../types";

type TitlesProps = {
  titles: TitlesType;
};

const Titles: React.FC<TitlesProps> = ({ titles }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-10">
      <h1 className="relative text-2xl font-bold text-gray-700 pb-2 drop-shadow-lg font-playfair">
        {titles.titleJP}
        <span className="absolute left-0 bottom-0 block w-full h-1 bg-gradient-to-r from-steelblue to-[#AFB4DB] rounded-full"></span>
      </h1>
      <p className="mt-2 text-steelblue italic tracking-[0.2em] text-sm font-playfair">
        {titles.titleEN}
      </p>
    </div>
  );
};

export default Titles;
