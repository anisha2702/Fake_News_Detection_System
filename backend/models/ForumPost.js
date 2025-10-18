import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    enum: ["Politics", "Technology", "Science", "Health", "Business", "Entertainment", "Sports", "World News"],
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  comments: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      content: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("ForumPost", forumPostSchema);
