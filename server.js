const express = require("express");

const app = express ();

const PORT = process.env.PORT || 3000;

const apiRoutes = require ("./routes/apiRoutes");

const htmlRoutes = require ("./routes/htmlRoutes.js");

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));