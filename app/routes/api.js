var User = require("../models/user");

module.exports = function(router){
  router.post("/users", (req, res)=>{
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email    = req.body.email;
    criteria = req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "";
    console.log(user.username, user.password, user.email, req.body);
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
  return router
}

