import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxLength: 280,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
)

// Method to toggle like on a comment
commentSchema.methods.toggleLike = async function(userId) {
  const hasLiked = this.likes.includes(userId);
  
  if (hasLiked) {
    // Remove like
    this.likes = this.likes.filter(id => id.toString() !== userId.toString());
  } else {
    // Add like
    this.likes.push(userId);
  }
  
  await this.save();
  return { liked: !hasLiked, likeCount: this.likes.length };
};

const Comment = mongoose.model("Comment", commentSchema);

export default Comment