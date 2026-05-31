import express from "express";

const router = express.Router();

type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

type InstagramApiResponse = {
  data?: InstagramMediaItem[];
  error?: unknown;
};

let cache: InstagramMediaItem[] | null = null;
let lastFetchedAt = 0;

const CACHE_TTL_MS = 10 * 60 * 1000;

router.get("/", async (_req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({
        error: "INSTAGRAM_ACCESS_TOKEN is not set",
      });
    }

    const now = Date.now();
    const isCacheValid = cache && now - lastFetchedAt < CACHE_TTL_MS;

    if (isCacheValid) {
      return res.json({ data: cache });
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`,
    );

    const data = (await response.json()) as InstagramApiResponse;

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch Instagram feed",
        details: data,
      });
    }

    const latestPosts = (data.data ?? []).slice(0, 3);

    cache = latestPosts;
    lastFetchedAt = now;

    return res.json({ data: latestPosts });
  } catch (error) {
    console.error("Instagram API error:", error);
    return res.status(500).json({
      error: "Unexpected server error while fetching Instagram feed",
    });
  }
});

export default router;
