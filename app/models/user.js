var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, lowercase: true, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required:true, lowercase: true, unique: true }
});

userSchema.pre("save", (next)=>{
  var user = this;
  bcrypt.hash(user.password, null, null, (err, hash)=>{
    if(err){return next(err);}
    user.password = hash;
    next();
  });
  
});

module.exports = mongoose.model("User", userSchema);