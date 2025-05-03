import { cva } from "class-variance-authority";

export interface iconsProps {
    color?: string,
    size?: "sm" | "md" | "lg" | "xl", // Make size optional since we'll have a default
}

export const iconVariant = cva("", {
    variants: {
        size: {
            sm: "size-4",
            md: "size-5",
            lg: "size-6",
            xl: "size-8"
        }
    },
    defaultVariants: {
        size: "lg" // Sets medium as the default size
    }
})