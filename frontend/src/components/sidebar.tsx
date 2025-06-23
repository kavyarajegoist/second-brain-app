import BrainIcon from "./icons/brain";
import DocumentIcon from "./icons/document";
import LinkTag from "./icons/linkTag";
import { Link } from "react-router-dom";
import HashTag from "./icons/hastag";
import TwitterIcon from "./icons/twitter";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, LogOutIcon } from "lucide-react";
import { useAuth } from "./context/authProvider";
import { useState } from "react";
import { type Sidebar } from "../types/sidebar.tyes";
import cn from "../utils/cn";
const sidbarItems: Sidebar[] = [
  {
    name: "Document",
    link: "/",
    icon: <DocumentIcon size="lg" />,
  },
  {
    name: "Hastags",
    link: "/",
    icon: <HashTag size="lg" />,
  },
  {
    name: "Tweets",
    link: "/",
    icon: <TwitterIcon />,
  },
  {
    name: "Links",
    link: "/",
    icon: <LinkTag size="lg" />,
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { handlelogout, authToken } = useAuth();
  const sidebarVariant = {
    open: {
      width: "20rem",
    },
    closed: {
      width: "6rem",
    },
  };
  const parentVariant = {
    open: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: -1,
      },
    },
  };
  const childVariant = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: -10,
    },
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        variants={sidebarVariant}
        className="flex flex-col items-start border  py-4 px-5 space-y-10 "
      >
        <div className="flex justify-between gap-5 items-center">
          {open && (
            <Link to="/" className="flex items-center gap-1">
              <BrainIcon className="cursor-pointer w-10" />
              <h1 className="text-2xl font-semibold">Second Brain</h1>
            </Link>
          )}
          <button
            className="  rounded-full shadow-md px-2 py-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <motion.ul
          variants={parentVariant}
          initial={false}
          animate={open ? "open" : "closed"}
          className={cn("flex flex-col w-full transition-all", "gap-10")}
        >
          {sidbarItems.map((items) => (
            <motion.li
              variants={childVariant}
              key={items.name}
              className={cn(
                "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 w-full py-1 transition-all duration-300 hover:cursor-pointer",
                open ? "px-2" : "px-1 flex justify-center"
              )}
            >
              <Link
                to={items.link}
                className={cn(
                  "flex items-center",
                  open ? "gap-2" : "justify-center"
                )}
              >
                <span style={{ opacity: open ? 1 : 1 }}>{items.icon}</span>
                {open && <h2 className="text-xl font-medium">{items.name}</h2>}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {authToken && (
          <div className=" absolute bottom-10 left-10">
            <Button
              text="Logout"
              variant="dangerOutline"
              startIcon={<LogOutIcon />}
              size="lg"
              onClick={handlelogout}
            />
          </div>
        )}
      </motion.div>
    </>
  );
};

interface Tabs {
  icon: any;
  text: string;
  open?: boolean;
}

const Tabs = (props: Tabs) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: -1 }}
        className="flex items-center gap-4 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 w-full py-1 px-2 hover:rounded-lg transition-all duration-300 hover:cursor-pointer"
      >
        <Link to={`/${props.text.toLowerCase()}`}>
          {props.icon}
          {props.open && <h2 className="text-xl font-medium">{props.text}</h2>}
        </Link>
      </motion.div>
    </>
  );
};

export default Sidebar;
