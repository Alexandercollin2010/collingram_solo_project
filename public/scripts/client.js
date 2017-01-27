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
      swal("Oh no you don't!!", "Wrong password or username!!");
    });

  };

  $scope.logout = function(){

    swal({
   title: "Are you sure?",
   text: "You will be logged out!",
   type: "warning",
   showCancelButton: true,
   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, log out!",
   cancelButtonText: "No, cancel please!",
   closeOnConfirm: false,
   closeOnCancel: false },
function(isConfirm){
   if (isConfirm) {
      $http({
        method: 'GET',
        url: '/index/logout'
      }).then(function successCallback(response) {
        console.log('User logout Success', response);
        $window.location.href = '/';

      }, function errorCallback(error) {
        console.log('Still logged in!!');
      });
   } else {
      swal("Cancelled", "You are still logged in!", "error");
   }
});

  };

  $scope.getUser = function(){
    $http({
      method: 'GET',
      url: '/index/user'
    }).then(function successCallback(response) {
      console.log('Get user', response);
      $scope.usernames = response.data.username ;

    }, function errorCallback(error) {
      console.log('Did not get the user');
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

    swal({
   title: "Are you sure?",
   text: "Did you spell everything right?!",
   type: "warning",
   showCancelButton: true,
   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, I want to Register",
   cancelButtonText: "No, cancel please!",
   closeOnConfirm: false,
   closeOnCancel: false },
  function(isConfirm){
   if (isConfirm) {


     $http({
       method: 'POST',
       url: '/register',
       data: userInfo
     }).then(function successCallback(response) {
       console.log('success', response);
       $window.location.href = '/';
     },function errorCallback(error) {
       console.log('error occurred!');
     });
   } else {
      swal("Cancelled", "You can fix those errors now!", "error");
   }
 });
  };



  $scope.updateUser = function(){
    var updateInfo = {
      email: $scope.emailUpdate,
      streetAdress: $scope.adressUpdate,
      city: $scope.cityUpdate,
      state: $scope.stateUpdate
  };

  $http({
    method: 'POST',
    url: '/update/updateUser',
    data: updateInfo
  }).then(function successCallback(response) {
    console.log('success', response);
    swal("Awesome!!", "Your info has been updated!", "success");
  }, function errorCallback(error) {
    console.log('error occurred!');
  });
  $scope.emailUpdate = '';
  $scope.adressUpdate = '';
  $scope.cityUpdate = '';
  $scope.stateUpdate = '';
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
      swal("Good job!", "You Submitted the Photo!!");

    }, function errorCallback(error) {
      console.log('error occurred!');
      swal('Uh-Oh!!!', "This File Already Exists!");
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
    swal({
   title: "Are you sure?",
   text: "You will not be able to recover this photo!",
   type: "warning",
   showCancelButton: true,
   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
   cancelButtonText: "No, cancel please!",
   closeOnConfirm: false,
   closeOnCancel: false },
function(isConfirm){
   if (isConfirm) {
      swal("Deleted!", "It Gone!!!", "success");
      $http({
        method: 'DELETE',
        url: '/userImages/' + $scope.images[ indexIn ]._id
      }).then(function(response){
        console.log(response);
        $scope.userImages();
      });
   } else {
      swal("Cancelled", "Your photo is safe :)", "error");
   }
});

  };




}]); // end inputController
