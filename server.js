var express =    require("express");
var app =        express();
var morgan =     require("morgan");
var mongoose =   require("mongoose");
var keys =       require("./config/keys");
var User =       require("./app/models/user");
var bodyParser = require("body-parser");


var port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Connected to database");
  }  
})

app.post("/users", (req, res)=>{
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email    = req.body.email;
    criteria = req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "";
    if(criteria){
      res.send("Ensure username, email, and password were provided.")
    }else{
      user.save((err)=>{
        if(err){
          res.send("Username or email already exists");
        }else{
          res.send("User Created");
        }
      });
    }
    
});

app.listen(port, ()=>{
  console.log("Now listening on port " + port );
});
