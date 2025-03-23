import { cva } from "class-variance-authority";


export interface iconsProps {
    color?:string,
    size:"sm" | "md" | "lg"|"xl",

}

export const iconVariant = cva("",{
    variants:{
        size:{
            sm: "size-4",
            md:"size-5",
            lg:"size-6",
            xl:"size-8"
        }
    }
})