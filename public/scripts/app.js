'use strict';

var IP = '';//'http://192.168.1.116:3000/';
angular.module('cfStormAppv2', ['ngRoute', 'oauth'])
	.config(function($locationProvider, $routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'views/organization.html',
			controller: 'OrganizationsCtrl'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})

		;
	})
	.controller('OrganizationsCtrl', function($scope, $rootScope, $http, AccessToken) {
			$http.get(IP+'api/organizations/',
			{
				headers: {
					'cf-token': 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlYWMxM2E5ZC00NmFmLTQ1MDktODVjNi02MzAyZGEwNzFkZDQiLCJzdWIiOiIzY2JkMWMzYS0xN2Y1LTQwNWMtYjc4YS0yNzBjODY4N2MwY2EiLCJzY29wZSI6WyJjbG91ZF9jb250cm9sbGVyLnJlYWQiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwib3BlbmlkIiwicGFzc3dvcmQud3JpdGUiXSwiY2xpZW50X2lkIjoiY2YiLCJjaWQiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiIzY2JkMWMzYS0xN2Y1LTQwNWMtYjc4YS0yNzBjODY4N2MwY2EiLCJ1c2VyX25hbWUiOiJyb2RyaWdvYm91cm5pQGhvdG1haWwuY29tIiwiZW1haWwiOiJyb2RyaWdvYm91cm5pQGhvdG1haWwuY29tIiwiaWF0IjoxNDExNTg5MDk0LCJleHAiOjE0MTE1ODk2OTQsImlzcyI6Imh0dHBzOi8vdWFhLnJ1bi5waXZvdGFsLmlvL29hdXRoL3Rva2VuIiwiYXVkIjpbIm9wZW5pZCIsImNsb3VkX2NvbnRyb2xsZXIiLCJwYXNzd29yZCJdfQ.MSYWIXEbnj7V9jmZp5WWWD5aghL4YIqFqk9jDqe7D2LoKMRjxMqQDKGt2e9MFi65AanwCGjPMLyuQY_Afh7zBo3ka1Y4H4wBQ6hBRk58_Lk_1HFLJdxhFyjSmND2G5IsXkgiW75wW9xn-_lHJ0kX3J-JHg032wWJS5PDCwys2nadTtcNSSRPi9ZMi9CIDqaiCZzj7zN0J9a41RRaMlBGnMDz_HdOEY3vj7EXabBbgtmrCw3GMXR77MGlL9vSZ94BaZZfkMpk70Oh2ojaiq38J0q3fTxx4oroCETmNvB76Km7n7Yy4mVj2GBCipeurFgMdUplcjMBFJjPhr_6o9lIrQ',
					'cf-api': 'https://api.run.pivotal.io'
				}
			})
				.success(function (data) {
					$rootScope.organizations = data;
					if($rootScope.organizations.resources.length == 1) {
						$rootScope.selected_organization = $rootScope.organizations.resources[0];
					}
				})
				.error(function (data) {
					$rootScope.error_organizations = 'An error has ocurred getting the organizations. '+data.error;
				});

			$http.get(IP+'api/spaces/',
			{
				headers: {
					'cf-token': 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlYWMxM2E5ZC00NmFmLTQ1MDktODVjNi02MzAyZGEwNzFkZDQiLCJzdWIiOiIzY2JkMWMzYS0xN2Y1LTQwNWMtYjc4YS0yNzBjODY4N2MwY2EiLCJzY29wZSI6WyJjbG91ZF9jb250cm9sbGVyLnJlYWQiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwib3BlbmlkIiwicGFzc3dvcmQud3JpdGUiXSwiY2xpZW50X2lkIjoiY2YiLCJjaWQiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiIzY2JkMWMzYS0xN2Y1LTQwNWMtYjc4YS0yNzBjODY4N2MwY2EiLCJ1c2VyX25hbWUiOiJyb2RyaWdvYm91cm5pQGhvdG1haWwuY29tIiwiZW1haWwiOiJyb2RyaWdvYm91cm5pQGhvdG1haWwuY29tIiwiaWF0IjoxNDExNTg5MDk0LCJleHAiOjE0MTE1ODk2OTQsImlzcyI6Imh0dHBzOi8vdWFhLnJ1bi5waXZvdGFsLmlvL29hdXRoL3Rva2VuIiwiYXVkIjpbIm9wZW5pZCIsImNsb3VkX2NvbnRyb2xsZXIiLCJwYXNzd29yZCJdfQ.MSYWIXEbnj7V9jmZp5WWWD5aghL4YIqFqk9jDqe7D2LoKMRjxMqQDKGt2e9MFi65AanwCGjPMLyuQY_Afh7zBo3ka1Y4H4wBQ6hBRk58_Lk_1HFLJdxhFyjSmND2G5IsXkgiW75wW9xn-_lHJ0kX3J-JHg032wWJS5PDCwys2nadTtcNSSRPi9ZMi9CIDqaiCZzj7zN0J9a41RRaMlBGnMDz_HdOEY3vj7EXabBbgtmrCw3GMXR77MGlL9vSZ94BaZZfkMpk70Oh2ojaiq38J0q3fTxx4oroCETmNvB76Km7n7Yy4mVj2GBCipeurFgMdUplcjMBFJjPhr_6o9lIrQ',
					'cf-api': 'https://api.run.pivotal.io'
				}
			})
				.success(function (data) {
					$rootScope.spaces = data;
				})
				.error(function () {
					$rootScope.error_spaces = 'An error has ocurred getting the spaces';
				});

			$http.get(IP+'api/apps/',
			{
				headers: {
					'cf-token': 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlYWMxM2E5ZC00NmFmLTQ1MDktODVjNi02MzAyZGEwNzFkZDQiLCJzdWIiOiIzY2JkMWMzYS0xN2Y1LTQwNWMtYjc4YS0yNzBjODY4N2MwY2EiLCJzY29wZSI6WyJjbG91ZF9jb250cm9sbGVyLnJlYWQiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwib3BlbmlkIiwicGFzc3dvcmQud3JpdGUiXSwiY2xpZW50X2lkIjoiY2YiLCJjaWQiOiJjZiIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiIzY2JkMWMzYS0xN2Y1LTQwNWMtYjc4YS0yNzBjODY4N2MwY2EiLCJ1c2VyX25hbWUiOiJyb2RyaWdvYm91cm5pQGhvdG1haWwuY29tIiwiZW1haWwiOiJyb2RyaWdvYm91cm5pQGhvdG1haWwuY29tIiwiaWF0IjoxNDExNTg5MDk0LCJleHAiOjE0MTE1ODk2OTQsImlzcyI6Imh0dHBzOi8vdWFhLnJ1bi5waXZvdGFsLmlvL29hdXRoL3Rva2VuIiwiYXVkIjpbIm9wZW5pZCIsImNsb3VkX2NvbnRyb2xsZXIiLCJwYXNzd29yZCJdfQ.MSYWIXEbnj7V9jmZp5WWWD5aghL4YIqFqk9jDqe7D2LoKMRjxMqQDKGt2e9MFi65AanwCGjPMLyuQY_Afh7zBo3ka1Y4H4wBQ6hBRk58_Lk_1HFLJdxhFyjSmND2G5IsXkgiW75wW9xn-_lHJ0kX3J-JHg032wWJS5PDCwys2nadTtcNSSRPi9ZMi9CIDqaiCZzj7zN0J9a41RRaMlBGnMDz_HdOEY3vj7EXabBbgtmrCw3GMXR77MGlL9vSZ94BaZZfkMpk70Oh2ojaiq38J0q3fTxx4oroCETmNvB76Km7n7Yy4mVj2GBCipeurFgMdUplcjMBFJjPhr_6o9lIrQ',
					'cf-api': 'https://api.run.pivotal.io'
				}
			})
				.success(function (data) {
					$rootScope.apps = data;
				})
				.error(function () {
					$rootScope.error_apps = 'An error has ocurred getting the apps';
				});
	})
	.controller('LoginCtrl', function($scope, $http) {
		$scope.username = '';
		$scope.password = '';
		$scope.api = '';
/*
		if(Auth.loggedIn() {
			$location.path('/');
		})

		
		$scope.signIn = function () {
			http.post('log.me.in', {
				{
					'username': $scope.username,
					'password': $scope.password,
					'api': $scope.api
				}
			}, {
				headers: {
					'something': ':)'
				}
			})
		};
*/
	})



;