const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

mongoose.connect(
  "mongodb+srv://papa:papa@cluster0.uri61.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "Candidate" }, // Default role is Candidate
});


const User = mongoose.model("users", UserSchema);

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.send({ message: "Registered successfully" });
  } catch (error) {
    res.send({ message: "Error registering" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send({ message: "User not found" });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.send({ message: "Invalid password" });
      } else {
        res.send({ message: "Logged in successfully", role: user.role });
      }
    }
  } catch (error) {
    res.send({ message: "Error logging in" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
