const express = require("express"); //import express library
const cors = require("cors"); // import cross origin resource sharing library
const path = require("path");
const bodyParser = require("body-parser"); //import body parser library
const mongoose = require("mongoose"); //import mangoose library
const User = require("./src/models/UserSchema"); //load user schema
const Meal = require("./src/models/MealSchema"); //load meal schema
const router = require("./src/routes/routerv1"); //load routes

const app = express(); // create express app

const PORT = process.env.PORT || 5000;
const db_username = process.env.MONGOUSER;
const db_password = "SSjena@25";

// bypass cors:
app.use("*", cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/public')));


app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

// mongodb atlas configuration
// mongodb+srv://sonaljena25:${db_password}@cluster0.3pocu.mongodb.net/nutify_me?retryWrites=true&w=majority
const url = `mongodb+srv://sonaljena25:${db_password}@cluster0.3pocu.mongodb.net/nutify_me?retryWrites=true&w=majority`
// const url = 'mongodb://localhost:27017/nutrify_me'
// const dbName='nutrify_me'
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//  bodyParser to parse incoming request bodies in a middleware before our handlers
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//passing the app to router
router(app);

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//server listening on localhost port 3000
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
