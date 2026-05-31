// src/data/mockData.ts
import { KeyVisual, StoreInfoType } from "../types";

export const keyVisuals: KeyVisual[] = [
  { id: 1, imageUrl: "/images/kv/kv-01.jpg", alt: "パン1" },
  { id: 2, imageUrl: "/images/kv/kv-02.jpg", alt: "パン2" },
  { id: 3, imageUrl: "/images/kv/kv-03.jpg", alt: "パン3" },
];

export const storeInfo: StoreInfoType = {
  name: "énaPain",
  address: "東京都西東京市東町2丁目16-24",
  phone: "03-1234-5678",
  instagram: "https://www.instagram.com/enapain/",
};
