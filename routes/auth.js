var express = require("express");
var authRouter = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

// /api/auth/checkuser
authRouter.get("/checkuser", (req, res, next) => {
  console.log("hi");
  if (req.user) {
    res.json({ userDoc: req.user });
  } else {
    res.json({ userDoc: null });
  }
});

// /api/auth/signup
authRouter.post("/signup", (req, res, next) => {
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

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }
  });
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const aNewUser = new User({
    username: username,
    password: hashPass
  });

  aNewUser.save(err => {
    if (err) {
      res.status(400).json({ message: "Saving user to database went wrong." });
      return;
    }

    // Automatically log in user after sign up!!!!!!!!
    // .login() here is actually predefined passport method
    req.login(aNewUser, err => {
      if (err) {
        res.status(500).json({ message: "Login after signup went bad." });
        return;
      }

      // Send the user's information to the frontend

      res.status(200).json(aNewUser);
    });
  });
});

// /api//login
authRouter.post("/login", (req, res, next) => {
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

//POST /logout
authRouter.post("/logout", (req, res, next) => {
  // req.logout()  by passport
  req.logout();
  res.status(200).json({ message: "Logout!" });
  // this.props.history.push("/");
});
module.exports = authRouter;
