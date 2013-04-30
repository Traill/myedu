/*global define */
'use strict';

define(['angular', 'app'], function (angular, app) {
    app.controller('MainCtlr', function($scope, $location) {

    	// layers.setBody(0);
		
		$scope.close = false;

		
		
		// Register the glue:
	    $scope.display = {};

	    $scope.sizes = {
			ratio: 50,
			window_size: 0,
			left: 0,
			right: 0
		}


		console.log($location);

		
	});
});
