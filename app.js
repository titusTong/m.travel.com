var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
//var favicon = require('serve-favicon');

var routes = express.Router();

var app = express();

app.set('views', path.join(__dirname,'dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

routes.get('*',function (req, res, next) {
  res.render('index');
})

app.use('/', routes)

// 404
app.use('*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
