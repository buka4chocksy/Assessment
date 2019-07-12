var express = require('express');
var app =  express();
var morgan = require('morgan');
var cookieparser =  require('cookie-parser');
require('dotenv').config();
var router = express.Router();
var rootRouter = require('./app/routes/index')(router);
var cors = require('cors');
var dbConfiguration = require('./app/config/DB');


//cronjb

//middleware
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cookieparser());
app.use(cors());
app.use('/api', rootRouter);

app.get('/', function(req, res){
    res.json({message:"hello world"});
});

dbConfiguration();



//app.use(respondeToRequest);

module.exports = app;



