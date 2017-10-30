var app =  angular.module('signUpApp',[]);
app.controller('signUpController',function($scope,$http, $window){
    $scope.signUp = function (){
        $http({
            method : "POST",
            data :{
                "name": $scope.name,
                "password": $scope.password,
                "email": $scope.email
            },
            url : '/signUp'
        }).success(function (data) {
            console.log("Inside success of signup controller");
            if (data.statusCode != 200) {
                console.log("Failed to process");
            } else {
                $window.location.assign("/logIn");
            }
        });
    };
});