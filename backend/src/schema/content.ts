import z from "zod";

export const contentSchema = z.object({
    title: z.string().min(4,"Title should of atleat four character").max(30,"Title should not me more than then characters"),
    type: z.string().min(3,"Type should minimum of 3 letter"),
    tags: z.array(z.string()),
    link: z.string().url("Given link is not an url."),


})

export type content = z.infer<typeof contentSchema>

