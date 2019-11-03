var express =    require("express");
var app =        express();
var router =     express.Router();
var morgan =     require("morgan");
var mongoose =   require("mongoose");
var keys =       require("./config/keys");
var bodyParser = require("body-parser");
var appRoutes =  require("./app/routes/api")(router);
var path =       require("path");


var port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use("/api",appRoutes);

mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Connected to database");
  }  
});
mongoose.set('useCreateIndex', true);

app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname + "/public/app/views/index.html"))
});

app.listen(port, ()=>{
  console.log("Now listening on port " + port );
});

