// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

//Adding more features to hbs
const helpers = require("handlebars-helpers");
hbs.registerHelper(helpers());


// Basic password encryption 
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const app = express();


const session = require("express-session");
app.use(
    session({
    //secret: "myaplicationsecret",
    //the line above is secret so it will be moved to .env to the enviroment for security purposes
    secret: process.env.SESSION_SECRET,
    cookie: {
        sameSite: true, //because both frontend and backend are running on the same hostname - localhost
        httpOnly: true, //we are not using https
        maxAge: 60000, //session time after 1 minute the session will end
    },
        rolling: true, //rolling allows the session to keep renewing as long as the user interacts with the app
})
);

function getCurrentLoggedUser(req, res, next) {
    if (req.session && req.session.currentUser) {
        app.locals.loggedInUser = req.session.currentUser.username; //local variable from express
    } else { 
        app.locals.loggedInUser = "";

    }
    next(); //so we can leave the middleware
}

app.use(getCurrentLoggedUser);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "quidditch-manager-project";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);
const auth = require("./routes/auth");
app.use("/", auth);
const dashboard = require("./routes/dashboard");
app.use("/", dashboard);
const students = require("./routes/students");
app.use("/", students );
const tournament = require("./routes/tournament");
app.use("/", tournament);
const houses = require("./routes/houses");
app.use("/", houses);
const match = require("./routes/match");
app.use("/", match);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
