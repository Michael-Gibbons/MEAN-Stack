angular.module("userControllers", ["userServices"])
.controller("regCtrl", function($http, $location, $timeout, User){
  var app = this;
  app.regUser = function(regData){
    app.loading = true;
    app.errorMsg = false;
    app.successMsg = false;

    User.create(app.regData).then(function(data){
      if(data.data.success){
        app.loading = false;
        app.successMsg = data.data.message + " Redirecting to home page";
        $timeout(function(){
          $location.path("/");
        }, 1000);
      }else{
        app.loading = false;
        app.errorMsg = data.data.message;  
      }
    });
  }

});