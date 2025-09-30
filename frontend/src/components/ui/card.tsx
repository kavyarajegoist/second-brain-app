import { FileTextIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { toEmbedUrl, type ContentType } from "../../utils/embed";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/authProvider";

interface Card {
  type?: ContentType;
  link: string;
  image?: any;
  title?: string;
  date: Date;
  id: string;
}

const Card = (props: Card) => {
  const { authToken } = useAuth();
  const handleDelete = async (id: string) => {
    try {
       await axios.delete(`/api/content/delete/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
    } catch (error) {}
  };
  const embedSrc = toEmbedUrl(props.type ?? "links", props.link);
  const tweetContainerRef = useRef<HTMLDivElement | null>(null);
  const lastRenderedTweetIdRef = useRef<string | null>(null);

  function extractTweetId(inputUrl: string): string | null {
    try {
      const url = new URL(inputUrl);
      // Formats: /<user>/status/<id>
      const parts = url.pathname.split("/").filter(Boolean);
      const statusIndex = parts.indexOf("status");
      if (statusIndex !== -1 && parts[statusIndex + 1]) {
        return parts[statusIndex + 1];
      }
      return null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    if (props.type !== "tweet" || !tweetContainerRef.current) return;
    const id = extractTweetId(props.link);
    if (!id) return;

    const renderTweet = () => {
      const tw = (window as any).twttr;
      if (tw && tw.widgets && typeof tw.widgets.createTweet === "function") {
        if (lastRenderedTweetIdRef.current === id) return;
        if (tweetContainerRef.current) {
          tweetContainerRef.current.innerHTML = "";
        }
        tw.widgets.createTweet(id, tweetContainerRef.current, {
          align: "center",
        });
        lastRenderedTweetIdRef.current = id;
      }
    };

    if (!(window as any).twttr) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://platform.twitter.com/widgets.js";
      script.onload = renderTweet;
      document.body.appendChild(script);
    } else {
      renderTweet();
    }
    return () => {
      if (tweetContainerRef.current) {
        tweetContainerRef.current.innerHTML = "";
      }
      lastRenderedTweetIdRef.current = null;
    };
  }, [props.type, props.link]);
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="max-w-72 border shadow-md rounded-xl flex flex-col gap-4 px-4 py-5   "
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-2 text-gray-500 items-center">
            <FileTextIcon size={20} />
            {props.title}
          </div>
          <div className="flex gap-4 text-gray-500 items-center">
            <Button
              text=""
              size="sm"
              startIcon={<Share2 size={20} />}
              variant="hover"
            />
            <Button
              onClick={() => handleDelete(props.id)}
              text=""
              size="sm"
              startIcon={<Trash2 size={20} />}
              variant="hover"
            />
          </div>
        </div>
        <div></div>
        <div className="flex flex-col gap-5 w-full border-none h-48">
          {props.type === "tweet" ? (
            <div ref={tweetContainerRef} className="h-full overflow-auto" />
          ) : (
            <iframe
              className="w-full h-full"
              src={embedSrc}
              title={props.title ?? "embed"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          )}
        </div>

        <div>
          <span className="text-gray-500 ">
            Added on {props.date.toDateString()}
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
