require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet"); // Security middleware to set HTTP headers

const jobRoute = require("./routes/job.route");

const app = express();

// Middleware setup
app.use(helmet()); // Adds security-related HTTP headers
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Allows parsing of URL-encoded data

// Routes setup
app.use("/api/jobs", jobRoute);

// Home route for initial testing
app.get("/", (req, res) => {
	res.send("Hello from Node Backend API, AlhamdulilLah x3");
});

// Database connection
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected to Database!");
	})
	.catch((error) => {
		console.error("Database connection failed:", error);
		process.exit(1); // Exit the process with failure code
	});

// Server setup
const port = process.env.PORT || 4004;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port} Enjoy coding!`);
});
