var myApp = angular.module('myApp', ['ngFileUpload', 'ngRoute']);

myApp.controller('mainController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside main controller');

  $scope.login = function(){

    var userInfo = {
      username: $scope.username,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/',
      data: userInfo
    }).then(function successCallback(response) {
      console.log(response);
      $window.location.href = '/uploads';
    }, function errorCallback(error) {
      console.log('error', error);
      $window.location.href = '/';
    });
  };
}]);

myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside register controller');

  $scope.userInfo = function(){
    $http({
      method: 'GET',
      url: '/register/userInfo'
    }).then(function successCallback(response) {
      console.log('User Info Success', response);
      $scope.infos= response.data;
    }, function errorCallback(error) {
      console.log('error occurred!');
    });
  };// end userInfo

  $scope.register = function() {
    var userInfo = {
      username: $scope.username,
      password: $scope.password,
      email: $scope.email,
      streetAdress: $scope.adress,
      city: $scope.city,
      state: $scope.state

    };

    $http({
      method: 'POST',
      url: '/register',
      data: userInfo
    }).then(function successCallback(response) {
      console.log('success', response);
      $window.location.href = '/';
    }, function errorCallback(error) {
      console.log('error occurred!');
    });
  };
}]);

myApp.controller('inputController', ['$scope', '$http', 'Upload','$window',
  function($scope, $http, Upload, $window) {
    console.log('Inside the inputController');



  $http.get('/uploads/photos').then(function(response){
    console.log(response.data);
    $scope.uploads = response.data;
  });


  $scope.submit = function(){
    Upload.upload({
      url: '/uploads',
      method: 'post',
      data: $scope.upload
    }).then(function (response) {
      console.log('submit', response.data);
      $scope.uploads.push(response.data);
      $scope.upload = {};

    });
  };

  $scope.userImages = function(){
    $http({
      method: 'GET',
      url: '/userImages/photos'
    }).then(function successCallback(response) {
      console.log('User Info Success', response);
      $scope.images= response.data;
    }, function errorCallback(error) {
      console.log('error occurred!');
    });
  };// end userImages

  $scope.deleteImage = function( indexIn ){
    //console.log( 'confirming removal of:', $scope.allTheHeros[ indexIn ] );
    var imageToDelete = $scope.images[ indexIn ]._id;
    if( confirm( 'Remove ' + $scope.images[ indexIn ].name + '?' ) ){
      //console.log( 'removing:', $scope.allTheHeros[ indexIn ] );
      $http({
        method: 'DELETE',
        url: '/userImages/' + $scope.images[ indexIn ]._id
      }).then(function(response){
        console.log(response);
        $scope.userImages();
      });
    }
  };




}]); // end inputController
