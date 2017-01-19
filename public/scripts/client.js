var myApp = angular.module('myApp', ['ngFileUpload']);

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
      $window.location.href = '/home';
    }, function errorCallback(error) {
      console.log('error', error);
      $window.location.href = '/';
    });
  };
}]);

myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside register controller');

  $scope.register = function() {
    var userInfo = {
      username: $scope.username,
      password: $scope.password
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

myApp.controller('inputController', ['$scope', '$http', 'Upload',
  function($scope, $http, Upload) {
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


    $scope.enterItem = function() {
      var itemInfo = {
        description: $scope.description,
        picUrl: $scope.imgUrl
      };// end itemInfo

      $http({
        method: 'POST',
        url: '/home',
        data: itemInfo
      }).then(function successCallback(response) {
        console.log('success', response);
       $scope.getItem();
      }, function errorCallback(error) {
        console.log('error occurred!');
      }); // end errorCallback

      $scope.description = '';
      $scope.imgUrl = '';
    };// end enterItem


    $scope.getItem = function(){
      $http({
        method: 'GET',
        url: '/home/whateverYouWant'
      }).then(function successCallback(response) {
        console.log('success', response);
        $scope.allTheItems = response.data ;
      }, function errorCallback(error) {
        console.log('error get occurred!');
      }); // end errorCallback
    };// end getItem



    $scope.removeItem = function( indexIn ){
        //console.log( 'confirming removal of:', $scope.allTheHeros[ indexIn ] );
        var recordToDelete = $scope.allTheItems[ indexIn ]._id;
        if( confirm( 'Remove ' + $scope.allTheItems[ indexIn ].description + '?' ) ){
          //console.log( 'removing:', $scope.allTheHeros[ indexIn ] );
          $http({
            method: 'DELETE',
            url: '/home/' + $scope.allTheItems[ indexIn ]._id
          }).then(function(response){
            console.log(response);
            $scope.getItem();
          });
        }
      };
}]); // end inputController
