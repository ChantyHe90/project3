var express = require("express");
var router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

// /api//checkuser
router.get("/checkuser", (req, res, next) => {
  console.log("hi");
  if (req.user) {
    res.json({ userDoc: req.user });
  } else {
    res.json({ userDoc: null });
  }
});

// /api/auth/signup
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  // if (password.length < 7) {
  //   res.status(400).json({
  //     message:
  //       "Please make your password at least 8 characters long for security reasons."
  //   });
  //   return;
  // }

  User.findOne({ username }).then(foundUser => {
    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass
    });

    aNewUser.save().then(newUser => {
      req.login(newUser, err => {
        res.status(200).json(newUser);
      });
    });
  });
});

// /api//login
router.post("/login", (req, res, next) => {
  console.log("bla");
  passport.authenticate("local", (err, theUser, failureDetails) => {
    console.log("blub");
    if (err) {
      res.status(500).json({ message: "Something went wrong enticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
  console.log("blub 2");
});

// /api/logout
router.get("/logout", function(req, res) {
  console.log("trying to logout....");
  req.logout();
  res.json({ message: "lougout success" });
});
module.exports = router;
