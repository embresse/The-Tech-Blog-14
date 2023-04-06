const router = require("express").Router();
const { User } = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    console.log("creating new user");
    console.log(newUser);
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
      console.log("New user Created");
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// log in user will error if user does not exist or wrong password
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid user! We have a non-believer..." });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Wrong Password! Do we have a shapeshifter?" });
      return;
    }

    // save session info
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      // response message if logged in
      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    // response message if unable to log in
    res
      .status(400)
      .json({ message: "No user account found! We have a non-believer..." });
  }
});

// logout route, destroys session >:)
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
