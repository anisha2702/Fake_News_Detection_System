import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { Plus, MessageSquare, ThumbsUp, Search, Send } from "lucide-react";

export default function ForumPage() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ category: "Technology", title: "", content: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Politics",
    "Technology",
    "Science",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
    "World News",
  ];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/forum/posts", {
        params: selectedCategory ? { category: selectedCategory } : {},
      });
      setPosts(response.data.posts);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to create a post");
      return;
    }

    try {
      await api.post("/forum/posts", newPost);
      setNewPost({ category: "Technology", title: "", content: "" });
      setShowNewPost(false);
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert("Please login to like posts");
      return;
    }

    try {
      await api.post(`/forum/posts/${postId}/like`);
      fetchPosts();
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  return (
    <div className={user ? "ml-64 p-8" : "p-8"}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 pt-[40px]">Community Forum</h1>
            <p className="text-slate-400">Discuss news, share insights, and interact with other users.</p>
          </div>
          {user && (
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          )}
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Create New Post</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter post title"
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your thoughts..."
                  className="w-full h-32 bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === ""
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  All Topics
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {selectedCategory ? `${selectedCategory} Discussions` : "All Discussions"}
                </h3>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-900/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-slate-400 text-center py-12">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="text-slate-400 text-center py-12">
                  No posts yet. Be the first to start a discussion!
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition-colors"
                    >
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
                          onClick={() => handleLike(post._id)}
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}