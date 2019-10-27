var express =  require("express");
var morgan =   require("morgan");
var mongoose = require("mongoose");
var keys =     require("./config/keys");
var app =      express();

var port = process.env.PORT || 8080;

app.use(morgan("dev"));
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Connected to database");
  }  
})

app.listen(port, ()=>{
  console.log("Now listening on port " + port );
});
