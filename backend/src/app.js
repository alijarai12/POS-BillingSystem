const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
// const tenantRoutes = require('./routes/tenantRoutes'); // Adjust the path as needed
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// Import routes
const userRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const variantRoutes = require("./routes/variantRoutes");
const uploadRoutes= require("./routes/uploadRoutes")

const app = express();
// const storage= multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null,'./uploads')
//   },
//   filename: function(req, file, cb){
//     cb(null, file.originalname)
//   }
// })
// const upload= multer({storage})
// Middleware
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Use routes
app.use("/api/user", userRoutes); // Prefixing routes with /api
// app.use('/api', tenantRoutes);
app.use("/api", productRoutes);
app.use("/api", variantRoutes);
app.use("/api", uploadRoutes);

// Sample function
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.json(req.file);
// });
app.get("/user", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
  } catch (error) {
    console.error("Error fetching users", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = app;
