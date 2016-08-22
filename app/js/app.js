// create or set a module 
var app = angular.module("app", ['ngRoute']).config(function ($routeProvider){
	$routeProvider.when('/login', {
		templateUrl:'login.html',
		controller:'LoginController'
	});
	$routeProvider.when('/home', {
		templateUrl:'home.html',
		controller: 'HomeController'
	});
	$routeProvider.otherwise({redirectTo: '/login'});
});

app.factory('AuthenticationService', function($location){
	return{
		login: function(credentials){
			if (credentials.username === "clint") {
			$location.path('/home');
		};
		},
		logout: function(){
			$location.path('/login');
		}
	};
});
app.controller('LoginController', function($scope, AuthenticationService){
	window.scope = $scope;
	$scope.credentials = { username:"", password:" "};
	$scope.login =  function(){
		AuthenticationService.login($scope.credentials);
	} 
});

app.controller('HomeController', function($scope, AuthenticationService){
	window.scope = $scope;
	$scope.title = 'Home';
	$scope.message = 'Mouse over these images to see our directives that work';
	$scope.logout = function(){
		AuthenticationService.logout();
	}
});

app.directive('showsMessageWhenHovered', function(){
	return{
		restrict:"A", //A=attribute C=class name, E=element, M=html comments
		link: function(scope, element, attributes){
			var originalMessage = scope.message;
			element.bind("mouseover", function(){
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind("mouseout", function(){
				scope.message = originalMessage;
				scope.$apply();
			});
		}
	};
});