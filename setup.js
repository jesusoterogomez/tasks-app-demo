// I knew you would open this file, since you're curious, I left some comments

// Express is a node.js "framework" that makes it easier to build web servers
const express = require("express");
const app = express();

// Runs on port 4000 -- It's the "door" for this app in your network :)
const PORT = 4000;

// Allow this server to interpret incoming JSON
app.use(express.json());

// Serve files (HTML, JS) for our website from the 'client' folder
// These files get delivered to the browser.
app.use(express.static("client"));

// Allow this server to be accessible from any "origin" (domain)
// This is basically saying:
// "Hey, this is public, accept any type of requests from anywhere"
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

module.exports = { app, PORT };
