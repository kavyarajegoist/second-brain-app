import Router, {
  application,
  response,
  type Request,
  type Response,
} from "express";
import jwt from "jsonwebtoken";
import { UserSchema } from "../schema/schema";
import { Content, userModel } from "../db";
import bcrypt from "bcrypt";
import { Access_Secret, Refresh_Secret } from "../config";
import cookieParser from "cookie-parser";
import userAuth from "../middleware/user";
import { contentSchema } from "../schema/content";
import type { AuthRequest } from "../middleware/user";
import { Types } from "mongoose";

const userRouter = Router();

userRouter.use(cookieParser());

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const parsedData = UserSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      res.status(411).json({
        errors: errorMessages,
        message: "Invalid username or password",
      });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (user) {
      res
        .status(403)
        .json({ message: "User already exsist with this username" });
    }
    const hassedPassword: string = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      password: hassedPassword,
    });

    res.status(200).json({
      message: "SignUp",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const parsedData = UserSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(411).json({
        message: "Invalid Input",
      });
      return;
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "User does not exsist" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Invalid username or passwrod" });
      return;
    }
    const refreshToken = jwt.sign({ id: user._id }, Refresh_Secret, {
      expiresIn: "30d",
    });
    const accessToken = jwt.sign({ id: user._id }, Access_Secret, {
      expiresIn: "15m",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Signin Successfully.",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
    return;
  }
});

userRouter.post("/refresh", (req: Request, res: Response) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    res.status(401).json({ message: "Refresh Token required." });
  }

  try {
    const decodedData = jwt.verify(refreshToken, Refresh_Secret) as {
      id: string;
    };
    const accessToken = jwt.sign({ id: decodedData.id }, Access_Secret, {
      expiresIn: "15m",
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      message: "Invalid refresh Token",
    });
  }
});

userRouter.get(
  "/profile",
  userAuth,
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Not Authorised User" });
    }
    try {
      const user = await userModel.findById(userId).select("-password");
      if (!user) {
        res.status(403).json({ message: "User not found" });
      }

      res.status(200).json({ message: "user found", user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

userRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error during logout",
    });
  }
});

userRouter.get(
  "/contents",
  userAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const contents = await Content.find({ userId }).select("-userId");
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

userRouter.post("/add-content", userAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const parseData = contentSchema.safeParse(req.body);

    if (!parseData.success) {
      const errorMessages = parseData.error;

      res.status(403).json({
        message: "Invalid Input",
        errorMessages,
      });
    }

    const { type, link, title, tags } = req.body;
    console.log("hello");
    await Content.create({
      type,
      link,
      title,
      tags,
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

userRouter.delete("/content/:id", userAuth, async (req: AuthRequest, res) => {
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

userRouter.post(
  "/brain/share/:id",
  userAuth,
  async(req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const contentId = req.params?.id;
      if (!userId) {
        res.status(401).json({ message: "User not authorised" });
        return;
    }
      if (!contentId) {
        res.status(403).json({ message: "Content id is required!" });
        return;
      }

      const content = await Content.findOne({_id:contentId,userId})
      if(!content){
        res.status(404).json({message:'Content not found'});
        return;
      }

      res.status(200).json({share:true,
        shareLink: `http://localhost/api/user/brain/:${contentId}`
      })
    } catch (error) {
      console.log("Main error" + error);
    }
  }
);


userRouter.get("/brain/:id",async(req:Request,res:Response)=>{
  
    try {
          const contentId = req.params?.id;
    if(!contentId)
    {
        res.status(403).json({
            message: 'Content is required'
        });
        return;
    }
    const content = await Content.findById(contentId);
    if(!content)
        {
            res.status(404).json({message:'Content with give id is not found.'});
            return;
        } 

    res.status(200).json({
        content
    })

    } catch (error) {
       console.log("main error:" + error)
       res.status(500).json({message:'Internal Server Error'}); 
    }


})
export default userRouter;
