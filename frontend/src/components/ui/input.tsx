import React, { InputHTMLAttributes } from "react";
import cn from "../../utils/cn";
import { cva,VariantProps } from "class-variance-authority";


export const inputVariants = cva("transition-all duration-300 rounded-lg",{
    variants:{
        variant:{
            text:"w-full px-2 py-1 border-2",
            file:"w-full px-2 py-1 border-2",
            link:"w-full px-2 py-1 border-2 "

        }
        
    },
    defaultVariants:{
        variant:"text"
    }
});

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants>{
        filePreview?:string
    }
    const Input = React.forwardRef<HTMLInputElement, InputProps>(
        ({ className, variant, filePreview, ...props }, ref) => {
          return (
            <div className="relative">
              <input
                className={cn(inputVariants({ variant, className }))}
                ref={ref}
                {...props}
              />
              {variant === "file" && filePreview && (
                <div className="mt-2">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="max-h-32 rounded-md"
                  />
                </div>
              )}
            </div>
          );
        }
      );

    export default Input;