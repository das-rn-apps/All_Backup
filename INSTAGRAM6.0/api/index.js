const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 8000;
const mongoUri = "mongodb+srv://DeepakDas:ashutosh82@cluster0.ll96sxh.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
//====================================================================================
const User = require("./models/user");
const Profile = require("./models/profile");
const Chat = require("./models/chat");
//==========================================================================================
//Get all user
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users", error);
    return res.status(500).json({ message: "Failed to retrieve the users" });
  }
});
//Get specific user
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user", error);
    return res.status(500).json({ message: "Failed to retrieve the user" });
  }
});
//endpoint to register a user
app.post("/user", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    //PROFILE TABLE UPDATE
    const currentUser = await User.findOne({ email });
    if (currentUser) {
      const newProfile = new Profile({ user_id: currentUser._id, username: username, email: email });
      await newProfile.save();
    }
    return res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json({ message: "Failed to add a user" });
  }
});
//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (password === existingUser.password) {
        existingUser.lastLogin = new Date();
        await existingUser.save();
        return res.status(201).json({ message: "User logged in successfully" });
      }
      else {
        return res.status(409).json({ message: "Invalid password" });
      }
    }
    else {
      return res.status(409).json({ message: "User does not exists" });
    }
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json({ message: "Failed to add a user" });
  }
});
//Profile update
app.post("/profile", async (req, res) => {
  try {
    const { user_id, username, email, photo } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingProfile = await Profile.findOne({ user_id: user_id });
    if (existingProfile) {
      existingProfile({ user_id: user_id, username: username, email: email, photo: photo, updatedAt: new Date() });
      await existingProfile.save();
    }
    else {
      return res.status(404).json({ message: "UserProfile does not exists" });
    }
    return res.status(201).json({ message: "Profile created successfully", profile: existingProfile });
  } catch (error) {
    console.error("Error creating profile", error);
    return res.status(500).json({ message: "Failed to create profile" });
  }
});
//Get aall chats
app.get("/chat", async (req, res) => {
  try {
    const chats = await Chat.find();
    return res.status(200).json(chats);
  } catch (error) {
    console.error("Error retrieving chat", error);
    return res.status(500).json({ message: "Failed to retrieve the chats" });
  }
});

//send Chat
app.post("/chat", async (req, res) => {
  try {
    const { from_id, to_id, message } = req.body;
    if (!from_id || !to_id || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newChat = new Chat({ from_id, to_id, message });
    await newChat.save();
  } catch (error) {
    console.error("Error add chat", error);
    return res.status(500).json({ message: "Failed to add chat" });
  }
});