const express = require("express");
const { BlogController } = require("../controller/blog.controller");
const catchAsync = require("../util/catchAsync");
const uploadImage = require("../middleware/uploadImage");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// Get all blogs
router.get("/", catchAsync(BlogController.getAllBlogs));

// Create a new blog
router.post("/", checkAuth, uploadImage.single("thumbnail"), (req, res, next) => {
  console.log("File:", req.file); // Should display file details if multer processed it
  console.log("Body:", req.body); // Should display form data fields
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed" });
  }
  next();
}, catchAsync(BlogController.createNewBlog));


// Get popular blogs
router.get("/popular", catchAsync(BlogController.getPopularBlogs));

// Get favorite blogs
router.get("/favourites", checkAuth, catchAsync(BlogController.getFavoriteBlogs));

// Get a single blog
router.get("/:postId", checkAuth, catchAsync(BlogController.getSingleBlog));

// Update a blog
router.patch("/:postId", checkAuth, catchAsync(uploadImage.single("thumbnail")), catchAsync(BlogController.updateBlog));

// Delete a blog
router.delete("/:postId", checkAuth, catchAsync(BlogController.deleteBlog));

// Like a blog
router.post("/:postId/like", checkAuth, catchAsync(BlogController.likeABlog));

// Add a blog to favorites
router.patch("/:postId/favourite", checkAuth, catchAsync(BlogController.toggleFavourite));

// Comment on a blog
router.post("/:postId/comment", checkAuth, catchAsync(BlogController.commentBlog));

// Delete a comment
router.delete("/:postId/comment/:commentId", checkAuth, catchAsync(BlogController.deleteComment));

module.exports = router;
