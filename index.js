var express=require("express")
var app=express()
var mongoose=require("mongoose")
var config=require("./app/appconfig/config")
const http=require("http")
var route="./app/route"
var model="./app/model"
const bp=require("body-parser")
var cors = require('cors')
const globalErrorMiddleware = require('./app/middlewares/appErrorHandler');
const logger = require('./app/lib/loggerLib');


app.use(cors())

var fs=require("fs")

app.use(bp.json())
app.use(bp.urlencoded({extended:false}))

app.all('*',function(req,res,next){
res.header("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
res.header("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE')
next();
})



fs.readdirSync(model).forEach(function(file){

if(~file.indexOf(".js"))
{
require(model + "/" +file)
}

})


fs.readdirSync(route).forEach(function(file){

if(~file.indexOf(".js"))
{
    let b = require(route+"/"+ file)
    b.setRouter(app)
}


})
app.use(globalErrorMiddleware.globalNotFoundHandler);
const server = http.createServer(app);
console.log(config);
server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
    throw error;
  }


  switch (error.code) {
    case 'EACCES':
      logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    default:
      logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
      throw error;
  }
}


function onListening() {
  
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    ('Listening on ' + bind);
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
    let db = mongoose.connect(config.db.uri,{ useMongoClient: true });
  }
  
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });
  
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
    logger.error(err,
      'mongoose connection on error handler', 10)
  }); 

mongoose.connection.on("open",function(error){
    if(error)
    {
        console.log("error");
    }
    else{
        console.log("connection success")
    }
})

mongoose.connection.on('open', function (err) {
    if (err) {
      console.log("database error");
      console.log(err);
      logger.error(err, 'mongoose connection open handler', 10)
    } else {
      console.log("database connection open success");
      logger.info("database connection open",
        'database connection open handler', 10)
    }
  }); 


module.exports = app;
