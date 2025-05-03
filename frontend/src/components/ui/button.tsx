import React from "react";
import cn from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";


export const buttonVariants = cva("transistion-all duration-300 rounded-md ", {
  variants: {
    variant: {
      primary: [
        "  bg-purple-500 hover:bg-purple-400 hover:bg-inverted hover:ring-4 hover:ring-border-subtle ring-gray-300 text-white ",
      ],
      secondary: ["  bg-purple-200 text-purple-700 hover:bg-purple-300 ring-blue-100 font-medium "],
      danger: ["   bg-red-400 text-white hover:bg-red-500      "],
      outline: [""],
    },

    size: {
      sm: "px-4 h-8 font-medium text-base",
      md: "px-6 py-2  font-medium tracking-tight text-base",
      lg: "px-6  h-12 text-xl font-semibold",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: "primary" | "secondary" | "danger";

  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
  classname?:string;
}

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return (
    <>
      <button
        className={cn(buttonVariants({ variant, size: props.size }), props.className)}
        onClick={props.onClick}
      >
        <div className="flex items-center gap-2 justify-center">
          {props.startIcon ? props.startIcon : null}
        {props.text}
        {props.endIcon ? props.endIcon : null}
        </div>
      </button>
    </>
  );
};
