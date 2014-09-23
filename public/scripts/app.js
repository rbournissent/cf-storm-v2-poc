'use strict';

angular.module('cfStormAppv2', [])
	.controller('AppsCtrl', function($scope, $http) {
			$http.get('/api/apps/')
				.success(function (data) {
					$scope.apps = data;
				})
				.error(function (data) {
					$scope.error = 'An error has ocurred';
				});
		}
	);