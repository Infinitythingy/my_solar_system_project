const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 5000;

// Serve the galaxy.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "galaxy.html")); // Adjust path if necessary
});

// Redirect to the solar-system app and start its Vite server
app.get("/solar-system", (req, res) => {
  // Start the Vite server for the solar-system project
  exec("npm start --prefix ./solar-system", (err, stdout, stderr) => {
    if (err) {
      console.error("Error starting solar-system server:", err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });

  // Redirect user to the solar-system app
  res.redirect("http://localhost:3000"); // Default Vite server port
});

app.listen(PORT, () => {
  console.log(`Galaxy project server is running at http://localhost:${PORT}`);
});
