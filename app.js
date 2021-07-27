import express from 'express';
import connectDB from './config/db';
import morgan from 'morgan';
import path from 'path';
import router from './routers';
import authrouter from './routers/auth';
import blogrouter from './routers/blogs';
import passport from 'passport';
import session from 'express-session';
import runPassport from './config/passport'
import { APP_PORT, DB_URL } from './config';
const app = express();
const MongoDbStore = require('connect-mongo');
// passport Configration
runPassport(passport);


// use for logging
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store : MongoDbStore.create({
      mongoUrl: DB_URL
  })
  }));


// passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());
// connect with Mongodb
connectDB();

// connets all routes
app.use(router);
app.use('/auth', authrouter);
app.use('/', blogrouter);


if (process.env.NODE_ENV === "production"){
  app.listen((process.env.PORT),() => {
    console.log(`server run at ${process.env.PORT} port`);
  });
}
else{
  app.listen((APP_PORT),() => {
    console.log(`server run at ${APP_PORT} port`);
  });

}