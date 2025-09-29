import React from "react";
import cn from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import {motion} from "framer-motion";


export const buttonVariants = cva("transistion-all duration-300 rounded-md ", {
  variants: {
    variant: {
      primary: [
        "  bg-purple-500 hover:bg-purple-400 hover:bg-inverted hover:ring-4 hover:ring-border-subtle ring-gray-300 text-white ",
      ],
      secondary: ["  bg-purple-200 text-purple-700 hover:bg-purple-300 ring-blue-100 font-medium "],
      danger: ["   bg-red-400 text-white hover:bg-red-500      "],
      outline: ["outline-2 hover:bg-purple-100"],
      hover:"hover:bg-purple-100 hover:shadow-md",
      dangerOutline: "text-red-400 hover:bg-red-200 "
    },

    size: {
      sm: "px-2 h-6 font-medium text-base",
      md: "px-6 py-2  font-medium tracking-tight text-base",
      lg: "px-6  h-12 gap-2 text-xl font-semibold",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: "primary" | "secondary" | "danger"|"hover"|"dangerOutline";

  size?: "sm" | "md" | "lg";
  text?: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
  classname?:string;
}

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return (
    <>
      <motion.button
        whileHover={{scale:1.07}}
        whileTap={{scale:0.90}}
        className={cn(buttonVariants({ variant, size: props.size }), props.className)}
        onClick={props.onClick}
      >
        <div className="flex items-center gap-2 justify-center">
          {props.startIcon ? props.startIcon : null}
        {props.text}
        {props.endIcon ? props.endIcon : null}
        </div>
      </motion.button>
    </>
  );
};
