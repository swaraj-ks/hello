require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql');


var app = express();
var cors = require('cors');
const request = require('request');
const jwt = require('jwt-simple');


const isAuthenticated = (req, res, next) => {

  const authFreeUrls = [
    {path: '/teachers/login', exact: true},
    {path: '/teachers', exact: true},
    {path: '/institution', exact: true},
    {path: '/site_management/banner', exact: true},
    {path: '/site_management/enquirie', exact: true},
    {path: '/verify', exact: false},
    {path: 'teachers/login', exact: true},
    {path: '/training/training_programme', exact: true},
    {path: '/institution/training_programme', exact: true},
  ]

  for(let url of authFreeUrls) {
    if(url.exact) {
      if(url.path === req.path) {
        return next()
      }
    } else {
      if(req.path.search(url.path) !== -1) {
        return next()
      }
    }
  }

  if (!req.cookies) {
   return res.status(401).json({'output': "Unauthorized"})
  }

  if (!req.cookies.session) {
    return res.status(401).json({'output': "Unauthorized"})
  }

  try {
    let token = req.cookies['session']
    jwt.decode(token, process.env.SECRET, false, process.env.SECRET_ALGORITHM)
    return next()
  } catch (error) {
    res.clearCookie('session')
    console.log(error)
    // console.log(`Unauthorized, request body ${req.body}`)
    return res.status(401).json({'output': "Unauthorized"})
  }
  
}
//database
// require('./bin/database')
app.use(cors({origin:true, credentials: true}))
app.use(cookieParser());
app.use('/api', isAuthenticated)
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//index router
require('./src/router/index')(app)
// app.get('/test',(req,res)=>{
  //   res.render('index')
  // })
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.engine('html',require('ejs').renderFile);
  app.set('view engine', 'ejs');
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/build')));
// app.use(express.static(path.join(__dirname, 'public/dev')));

function getRoot(request, response) {
  response.sendFile(path.resolve('./public/build/index.html'));
}

app.get('/', getRoot);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
