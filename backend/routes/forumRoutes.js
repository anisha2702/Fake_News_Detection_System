import express from "express";
import { 
  createPost, 
  getPosts, 
  addComment, 
  likePost 
} from "../controllers/forumController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/posts", protect, createPost);
router.get("/posts", getPosts);
router.post("/posts/:postId/comment", protect, addComment);
router.post("/posts/:postId/like", protect, likePost);

export default router;