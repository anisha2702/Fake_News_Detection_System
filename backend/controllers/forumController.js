// ==================== FILE 10: backend/controllers/forumController.js ====================
import ForumPost from "../models/ForumPost.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { category, title, content } = req.body;
    const userId = req.userId;

    const post = await ForumPost.create({
      userId,
      category,
      title,
      content
    });

    await User.findByIdAndUpdate(userId, { 
      $push: { forumPosts: post._id } 
    });

    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) filter.category = category;

    const posts = await ForumPost.find(filter)
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    const post = await ForumPost.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            userId,
            username: user.username,
            content
          }
        }
      },
      { new: true }
    ).populate("userId", "username");

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await ForumPost.findById(postId);

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

