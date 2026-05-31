import React, { useEffect, useState } from "react";
import FadeInSection from "./FadeInSection";

type InstaPost = {
  id: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  media_type?: string;
};

const getDisplayCaption = (caption?: string) => {
  if (!caption) return "Instagramの投稿を見る";

  return caption
    .replace(/\n/g, " ")
    .replace(/#[^\s#]+/g, "")
    .replace(/^[・•\-\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
};

const InstagramFeed: React.FC = () => {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstaPosts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/instagram-feed");
        const data = await res.json();

        if (data?.data) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Instagramの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstaPosts();
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-[1.75rem] bg-white/80 p-3 shadow-[0_6px_20px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/80"
            >
              <div className="aspect-square animate-pulse rounded-[1.6rem] bg-slate-100" />
              <div className="pt-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((post, index) => {
              const imageSrc =
                post.media_type === "VIDEO"
                  ? post.thumbnail_url || post.media_url
                  : post.media_url;

              return (
                <FadeInSection key={post.id} delay={index * 120}>
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-[1.75rem] bg-white/80 p-3 shadow-[0_6px_20px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
                  >
                    <div className="overflow-hidden rounded-[1.6rem]">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt="Instagram post"
                          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                        />
                      ) : (
                        <div className="aspect-square w-full bg-slate-100" />
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="line-clamp-1 text-[15px] text-[#4b6078]">
                        {getDisplayCaption(post.caption)}
                      </p>
                      <span className="ml-3 shrink-0 text-slate-400 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </div>
                  </a>
                </FadeInSection>
              );
            })}
          </div>
        </>
      ) : (
        <div className="rounded-[1.75rem] bg-white/80 p-6 text-center shadow-[0_6px_20px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/80">
          <p className="text-sm leading-7 text-slate-500">
            Instagramの投稿を表示できませんでした。
          </p>
        </div>
      )}
    </div>
  );
};

export default InstagramFeed;
