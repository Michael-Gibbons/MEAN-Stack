angular.module("userApp", ["appRoutes", "userControllers", "userServices","authServices", "ngAnimate", "mainController" ])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors');
});