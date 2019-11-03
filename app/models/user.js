var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, lowercase: true, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required:true, lowercase: true, unique: true }
});

userSchema.pre("save", function(next){
  var user = this;
  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err){return next(err);}
      user.password = hash;
      next();
    });
  });
  
});

module.exports = mongoose.model("User", userSchema);