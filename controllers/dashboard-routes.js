const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
// renders new post view
    res.render('new-post', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});



router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});


module.exports = router;
