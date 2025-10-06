import { Request, Response } from "express";
import { PostService } from "./post.service";


const createPost = async (req: Request, res: Response) => {
  console.log("in controller",req.user)
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
   

    const result = await PostService.createPost({
      ...req.body,
      authorId: req.user.userId, // ✅ now recognized as number
    });
    

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts", details: err });
    }
};


export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await PostService.getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to get post", details: error });
  }
};

export const updatePostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await PostService.updatePostBySlug(req.params.slug, req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post", details: error });
  }
};

export const deletePostBySlug = async (req: Request, res: Response) => {
  try {
    await PostService.deletePostBySlug(req.params.slug);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post", details: error });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePostBySlug,
  deletePostBySlug,
};