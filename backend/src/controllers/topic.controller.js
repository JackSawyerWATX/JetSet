import asyncHandler from "express-async-handler";
import Post from "../models/post.model.js";

export const getTrendingTopics = asyncHandler(async (req, res) => {
  // Extract hashtags from post content using regex
  const posts = await Post.find({ content: /#[\w]+/g });
  
  // Create a map to count hashtag occurrences
  const topicCounts = {};
  posts.forEach(post => {
    const hashtags = post.content.match(/#[\w]+/g) || [];
    hashtags.forEach(tag => {
      topicCounts[tag] = (topicCounts[tag] || 0) + 1;
    });
  });

  // Convert to array and sort by count
  const trendingTopics = Object.entries(topicCounts)
    .map(([topic, count]) => ({
      topic,
      posts: count
    }))
    .sort((a, b) => b.posts - a.posts)
    .slice(0, 10); // Get top 10

  res.status(200).json({ trendingTopics });
});