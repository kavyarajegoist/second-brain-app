import { type Request, type Response,Router } from "express";
import {type AuthRequest } from "../middleware/user";
import userAuth from "../middleware/user";
import { Content,Links } from "../db";


const brainRouter = Router();


brainRouter.post(
  "/brain/share/:id",
  userAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const contentId = req.params?.id;
      const share: boolean = req.body.share;

      if (!userId) {
        res.status(401).json({ message: "User not authorised" });
        return;
      }
      if (!contentId) {
        res.status(403).json({ message: "Content id is required!" });
        return;
      }

      const content = await Content.findOne({ _id: contentId, userId });
      if (!content) {
        res.status(404).json({ message: "Content not found" });
        return;
      }

      if (share) {
        const hash = CryptoJS.SHA224(contentId + Date.now())
          .toString(CryptoJS.enc.Hex)
          .slice(0, 16);
        const shareLink: string = `http://localhost:3000/api/user/brain/${hash}`;
       

        await Links.create({
          hash: hash,
          userId,
        });
        
        
          res.status(200)
          .json({
            shareLink: shareLink,
          });
        
      }
    } catch (error) {
      console.log("Main error" + error);
    }
  }
);

brainRouter.get("/brain/:id", async (req: Request, res: Response) => {
  try {
    const hash = req.params?.id;
    console.log(hash);
    
    if (!hash) {
      res.status(403).json({
        message: "Invalid Link",
      });
      return;
    }

    const link = await Links.findOne({hash});
    console.log(link)
    const userId = link?.userId;
    const content = await Content.findOne({userId: link?.userId}).select('title tags -userId  link ').populate({path:"userId",model:'user',select:"username -_id"});
    if (!content) {
      res.status(404).json({ message: "Content with give id is not found." });
      return;
    }

    res.status(200).json({
      content,
    });
  } catch (error) {
    console.log("main error:" + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default brainRouter;