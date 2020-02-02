var User = require("../models/user");
var jwt = require("jsonwebtoken");
var secret = "harrypotter";
module.exports = function (router) {
  router.post("/users", (req, res) => {
    // User Registration
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    criteria = req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "";
    console.log(user.username, user.password, user.email, req.body);
    if (criteria) {
      res.json({
        success: false,
        message: "Ensure username, email, and password were provided."
      });
    } else {
      user.save((err) => {
        if (err) {
          res.json({
            success: false,
            message: "Username or email already exists"
          });
        } else {
          res.json({
            success: true,
            message: "Thanks for signing up!"
          });
        }
      });
    }

  });

  // User Login

  router.post('/authenticate', function (req, res) {
    User.findOne({
      username: req.body.username
    }).select('email username password').exec(function (err, user) {
      // First check if there is an error
      if (err) {
        console.log(err); // Log the error to the console to see what went wrong
      } else {
        // If no error exists, check if the user was found in the database
        if (!user) {
          res.json({
            success: false,
            message: 'Could not authenticate user'
          }); // Let user know the user was not found.
        } else if (user) {
          // Check if password was provided
          if (req.body.password) {
            var validPassword = user.comparePassword(req.body.password); // Compare users password to password in database
            // Check if there is a match
            if (!validPassword) {
              res.json({
                success: false,
                message: 'Wrong credentials'
              }); // Send error if password does not match
            } else {
              var token = jwt.sign({
                username: user.username,
                email: user.email
              }, secret, {
                expiresIn: '24h'
              });
              res.json({
                success: true,
                message: 'Successfully logged in',
                token: token
              }); // Send success if password does match.
            }
          } else {
            res.json({
              success: false,
              message: 'No password provided'
            }); // Send error if no password was provided
          }
        }
      }
    });
  });

  router.use(function(req, res, next ){
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if(token){
      jwt.verify(token, secret, function(err, decoded){
        if(err){
          res.send({success: false, message: "Token Invalid"});
        }else{
          req.decoded = decoded;
          next();
        }
      }); 
    }else{
      res.send({success: false, message: "No token provided"});
    }
  });

  router.post('/me', function(req,res){
    res.send(req.decoded); 
  })
  return router
}