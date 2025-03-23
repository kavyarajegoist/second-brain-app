import { type Request, type Response,Router } from "express";
import {type AuthRequest } from "../middleware/user";
import userAuth from "../middleware/user";
import { Content } from "../db";
import { contentSchema } from "../schema/content";

const contentRouter = Router();


contentRouter.get(
  "/contents",
  userAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const contents = await Content.find({ userId })
      .populate({
        path: "userId",
        model: "user", // Make sure this matches your model name in mongoose
        select: "username -_id"
      });

      if (!contents) {
        res.status(403).json({ message: "No Content found" });
      }
      res.status(200).json({ message: "content founde", contents });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

contentRouter.post("/add-content", userAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const parsedData = contentSchema.safeParse(req.body);

    if (!parsedData.success) {
      const errorMessages = parsedData.error;

      res.status(403).json({
        message: "Invalid Input",
        errorMessages,
      });
    }

    console.log("hello");
    await Content.create({
      type: parsedData.data?.type,
      link: parsedData.data?.link,

      title: parsedData.data?.title,
      tags: parsedData.data?.tags,
      userId,
    });

    res.status(201).json({ message: "Contend add successfully" });
    console.log("hellp");
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "error occured",
      err,
    });
  }
});

contentRouter.delete("/content/:id", userAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const contentId = req.params?.id;
    console.log(contentId);
    if (!contentId) {
      res.status(404).json({ message: "Content id is required" });
      return;
    }
    if (!userId) {
      res.status(401).json({ message: "user not authenticated" });
      return;
    }

    const result = await Content.findOneAndDelete({ userId, _id: contentId });
    if (!result) {
      res.status(403).json({ message: "Content not found" });
      return;
    }
    res.status(200).json({ message: "Content deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default contentRouter;