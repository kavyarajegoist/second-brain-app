import { type Request, type Response,Router } from "express";
import {type AuthRequest } from "../middleware/user";
import userAuth from "../middleware/user";
import { Content,Links } from "../db";
import CryptoJS from "crypto-js";


const brainRouter = Router();


brainRouter.post(
  "/share",
  userAuth,
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const share: boolean = req.body.share;
    try {

      if (!userId) {
        res.status(401).json({ message: "User not authorised" });
        return;
      }
    

      if (share) {
        const hash = CryptoJS.SHA224(userId + Date.now())
          .toString(CryptoJS.enc.Hex)
          .slice(0, 16);
       

        await Links.create({
          hash: hash,
          userId,
        });
        
        
          res.status(200)
          .json({
            shareLink: `/${hash}`,
          });
        
      }
    } catch (error) {
      console.log("Main error" + error);
    }
    if(!share)
    {
      await Links.deleteOne({userId});
    }

  }
);

brainRouter.get("/:sharehash", async (req: Request, res: Response) => {
  try {
    const hash = req.params?.sharehash;
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
    const content = await Content.find({userId: userId}).select('title tags -userId  link ').populate({path:"userId",model:'user',select:"username -_id"});
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