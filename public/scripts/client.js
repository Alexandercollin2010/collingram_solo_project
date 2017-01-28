var myApp = angular.module('myApp', ['ngFileUpload', 'ngRoute']);

// controller that is managing all user info
myApp.controller('mainController',['$scope', '$http', '$window',
function($scope, $http, $window) {
  console.log('inside main controller');


  // sending the user info when you log in to make sure you are registered
  $scope.login = function(){

    var userInfo = {
      username: $scope.username,
      password: $scope.password
    };// end userInfo

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
    });// end post call
  };// end login


  // logging you out of collingram
  $scope.logout = function(){
    // alert asking if you want to log out
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
        }// end else
      });// end swal alert
    };// end logout

    // getting the user that is currently logged in an displaying it on the DOM
    $scope.getUser = function(){
      $http({
        method: 'GET',
        url: '/index/user'
      }).then(function successCallback(response) {
        console.log('Get user', response);
        $scope.usernames = response.data.username ;

      }, function errorCallback(error) {
        console.log('Did not get the user');
      }); // end get call
    }; // end getUser
  }]); // end mainController

  // controller used for registration
  myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
    console.log('inside register controller');

    // funtion used to get the user info
    $scope.userInfo = function(){
      $http({
        method: 'GET',
        url: '/register/userInfo'
      }).then(function successCallback(response) {
        console.log('User Info Success', response);
        $scope.infos= response.data;
      }, function errorCallback(error) {
        console.log('error occurred!');
      });// end http get call
    };// end userInfo

    // function used to get the register info
    $scope.register = function() {
      var userInfo = {
        username: $scope.username,
        password: $scope.password,
        email: $scope.email,
        streetAdress: $scope.adress,
        city: $scope.city,
        state: $scope.state
      };// end userinfo
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
          }// end else
        }); //end else
      }; // end register

      // function used to update the user info
      $scope.updateUser = function(){
        var updateInfo = {
          email: $scope.emailUpdate,
          streetAdress: $scope.adressUpdate,
          city: $scope.cityUpdate,
          state: $scope.stateUpdate
        };// end updateInfo
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
      }; // end updateUser
    }]);// end updateUser

    // controller used to take in the user inputs
    myApp.controller('inputController', ['$scope', '$http', 'Upload','$window',
    function($scope, $http, Upload, $window) {
      console.log('Inside the inputController');

      // bringing in the uploaded photos from the database
      $http.get('/uploads/photos').then(function(response){
        console.log(response.data);
        $scope.uploads = response.data;
      });// end get call

      // submitting the new photo to the database
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
        });// end upload.upload
      };// end submit

      // bringing back just the user that is logged in images
      $scope.userImages = function(){
        $http({
          method: 'GET',
          url: '/userImages/photos'
        }).then(function successCallback(response) {
          console.log('User Info Success', response);
          $scope.images= response.data;
        }, function errorCallback(error) {
          console.log('error occurred!');
        });// end http get call
      };// end userImages

      // deleting the users image
      $scope.deleteImage = function( indexIn ){
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
              });// end http delete call
            } else {
              swal("Cancelled", "Your photo is safe :)", "error");
            }// end else
          });// end swal alert
        };// end deleteImage
      }]); // end inputController
