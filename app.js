const express = require("express");
const app = express();
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const {passport} = require("./passport");
const { format } = require('date-fns');
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Setup middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Security Middleware
// app.use(helmet());

// CORS Setup
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'), false);
    }
  },
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type,Authorization, Cookie',
  credentials: true // Allow cookies to be sent
};

app.use(cors(corsOptions));


// Initialize Passport
app.use(passport.initialize());

// Serve static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/dashboard", dashboardRouter)


app.post("/logout", (req, res, next) => {
  res.clearCookie('token', { path: '/' }); // Clears the HttpOnly cookie
  res.json({ message: 'Logged out successfully' });
})

// Server
app.listen(8080, () => {
  console.log('App running on port 8080');
});