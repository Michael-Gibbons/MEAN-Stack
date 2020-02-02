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

})

.controller("facebookCtrl", function($routeParams, Auth, $location, $window){
  var app = this;
  if($window.location.pathname == '/facebookerror'){
    app.errorMsg = "Facebook Email not found in database"
  }else{
    Auth.facebook($routeParams.token);
    $location.path('/');
  }
});