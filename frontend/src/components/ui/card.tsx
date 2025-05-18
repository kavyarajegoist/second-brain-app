import { FileTextIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Share2 } from "lucide-react";
import {  easeOut, motion } from "framer-motion";
import { Button, buttonVariants } from "./button";

interface Card {
  type?: any;
  shareicon?: any;
  image?: any;
  title?: string;
  date: Date;
}

const Card = (props: Card) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2, }}
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
              text=""
              size="sm"
              startIcon={<Trash2 size={20} />}
              variant="hover"
            />
          </div>
        </div>
        <div></div>
        <div className="flex flex-col gap-5 w-full border-none">
          {/* <iframe className="w=" src="https://www.youtube.com/embed/WmvpJ4KX30s" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe> */}
        </div>
        <div>
          <span className="text-gray-500 ">Added on</span>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
