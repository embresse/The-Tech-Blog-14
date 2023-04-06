const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// creates posts
router.post("/", withAuth, async (req, res) => {
  const body = req.body;
  console.log(req.body);
  try {
    const newPost = await Post.create({ ...body, user_id: req.session.userId });
    res.json(newPost);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
