import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import instagramRoutes from "./routes/instagram";
// import { pool } from "./db";

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());
app.use(express.json());

app.use("/api/instagram-feed", instagramRoutes);

// DB 接続確認
// async function testDbConnection() {
//   try {
//     const [rows] = await pool.query("SELECT NOW() AS now");
//     console.log("DB接続成功！現在時刻:", rows);
//   } catch (err) {
//     console.error("DB接続失敗:", err);
//   }
// }

// testDbConnection();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
