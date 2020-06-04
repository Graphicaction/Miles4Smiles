// Loading environmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
  require('dotenv').config();
  // process.env.DEV_PROXY;
}
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
// const cookieSession = require('cookie-session')
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db'); // loads our connection to the mongo database
const routes = require("./routes");
const passport = require('./passport');
const keys = require("./config/keys")
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: process.env.APP_SECRET || 'this is the default passphrase',
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}));

// app.use(cookieSession({
// 	//save cookie for 30days
// 	maxAge: 30*24*60*60*1000,
// 	keys: process.env.COOKIE_KEY || [keys.COOKIE_KEY]

// })
// );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Passport
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// //Google OAuth
require("./passport/GoogleStrategy");
require('./routes/auth/Googleauth')(app);

//Github OAuth
// require("./passport/GithubStrategy");
// require('./routes/auth/GithubAuth')(app);

//get rid of cors
// app.use(function(req, res) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// });


app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// If it's production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	// console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/'))
	});
}

// Add routes, both API and view
app.use(routes);

// Error handler
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

// Starting Server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
