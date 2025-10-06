import { Router } from "express";
import { PostController } from "./post.controller";
import { checkAuth } from "../../middleware/checkAuth";


const router = Router();

router.post("/",checkAuth(), PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:slug",PostController.getPostBySlug);
router.patch("/:slug",checkAuth(), PostController.updatePostBySlug);
router.delete("/:slug", checkAuth(), PostController.deletePostBySlug);

export  const postRouter= router;
