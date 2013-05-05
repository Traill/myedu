/*global define */
'use strict';

define(['angular', 'jquery'], function (angular, $) {
    var app = angular.module('trailhead', [], function($routeProvider, $locationProvider) {
    	// $locationProvider.html5Mode(true).hashPrefix('!');
    	
    	$routeProvider.when('/', {
		    templateUrl: 'js/partial/home.html'
		});

		$routeProvider.when('/node/:node', {
		    templateUrl: 'js/partial/view.html',
		    controller: 'nodeCtrl'
		});
    	

    });

    return app;
});
