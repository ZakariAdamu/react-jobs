const express = require("express");
const mongoose = require("mongoose");

const jobRoute = require("./routes/job.route");
const app = express();

app.use(express.json());

// middleware configuration to allow for entering data in other formats (eg. form encoded format) aside the JSON format
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/jobs", jobRoute);

// app.listen(5001, () => {
// 	console.log("Server is running on port 5001 and thankszz!!!");
// });

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port} Enjoy coding!`);
});

// Get backend api homepage (initial url testing)
app.get("/", (req, res) => {
	res.send("Hello from Node Backend API, AlhamdulilLah");
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to Database!!");
	})
	.catch(() => console.log("Connection failed!"));
