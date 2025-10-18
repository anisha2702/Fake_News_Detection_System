import React from "react";
import { ThumbsUp, MessageSquare } from "lucide-react";

export const ForumThread = ({ post, onLike }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-bold text-white mb-1">{post.title}</h4>
          <p className="text-sm text-slate-400">
            Posted by {post.userId?.username || "Unknown"} •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
          {post.category}
        </span>
      </div>
      <p className="text-slate-300 text-sm mb-4">{post.content.substring(0, 200)}...</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onLike(post._id)}
          className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm">{post.likes?.length || 0}</span>
        </button>
        <div className="flex items-center gap-1 text-slate-400">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm">{post.comments?.length || 0} comments</span>
        </div>
      </div>
    </div>
  );
};