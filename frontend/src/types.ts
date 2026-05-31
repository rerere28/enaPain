// src/types.ts

export type KeyVisual = {
  id: number;
  imageUrl: string;
  alt: string;
};

export type Announcement = {
  id: number;
  date: string;
  title: string;
  content: string;
};

export type BakeSchedule = {
  id: string;
  product: string; // 商品名
  productFR: string;
  time: string; // 焼き上がり時間
};

/* ======================
　商品カテゴリー
====================== */

export type ProductCategory =
  | "viennoiserie"
  | "pain"
  | "sweet"
  | "savory"
  | "sandwich";

/* ======================
  商品
====================== */

export type Product = {
  id: string;

  name: string;
  french_name?: string;

  imageUrl?: string;
  crumbImageUrl?: string; // ← 断面写真

  description?: string;

  badge?: string; // ← #人気 など
  category?: ProductCategory; // ← 商品カテゴリー

  featureText?: string;
  recommendation?: string;

  sortOrder?: number;
  isActive?: boolean;
};

export type StoreInfoType = {
  name: string;
  address: string;
  phone: string;
  instagram?: string;
};

export type ReservationItem = {
  id: string;
  product: Product;
  quantity: number;
  bakeTime: string;
};

export type Reservation = {
  id: string;
  userId: string; // 誰の予約かを識別するため
  name: string; // 予約者の名前
  date: string; // 受け取り日時
  items: ReservationItem[]; // 複数商品を予約できるように
};

export type TitlesType = {
  titleJP: string;
  titleEN: string;
};

export type BakeTimeObj = {
  time: string;
  stock: number | null;
  isReservable: boolean;
};
