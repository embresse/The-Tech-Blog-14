const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// if user logged in then they can add a comment to a post
router.post("/", withAuth, async (req, res) => {
  try {
    const addComment = await Comment.create({
        ...req.body,
        userId: req.session.userId,
    });
    res.json(addComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; 
