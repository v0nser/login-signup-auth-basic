const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



mongoose.connect("mongodb+srv://raghuvanshivaibhav01:Err1Uw2ycCEcS6xt@cluster0.1fkp98r.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB connected"))
  .catch(err => console.error("Error connecting to DB:", err));

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  //check email
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      //check password
      if (password === user.password) {
        res.send({ message: "Login successfully", user: user });
      } else {
        res.send({ message: "Password and confirm password didn't match" });
      }
    } else {
      res.send({ message: "Please login to proceed" });
    }
  });
});

app.post("/signup", (req, res) => {
  const { fname, lname, email, password } = req.body;
  //check email
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User is already registerd" });
    } else {
      const user = new User({
        fname,
        lname,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Account has been created!! Please Login" });
        }
      });
    }
  });
  // res.send("register");
  //   console.log(req.body);
});

app.listen(8080, () => {
  console.log("Server starting at 8080");
});
