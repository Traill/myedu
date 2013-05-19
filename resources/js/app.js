/*global define */
'use strict';

define(['angular', 'jquery'], function (angular, $) {
    var app = angular.module('trailhead', [], function($routeProvider, $locationProvider) {
    	
        // Resolve the route and change the view in the panel
    	$routeProvider.when('/', {
		    templateUrl: 'js/partial/home.html',
            resolve:{
                // This should load the graph (ajax, edges and so...)
                // But it does not work yet (?)
                // So if you need, you can do graph.promise.then(f);
                // To execute code after having loading the graph.
                'graphLoading': function(graph){
                    
                    return graph.promise;
                }
            }
		});
        // Display the course info:
		$routeProvider.when('/node/:node', {
		    templateUrl: 'js/partial/view.html',
		    controller: 'nodeCtrl',
            resolve:{
                // Loading...
                'graphLoading': function(graph){
                    return graph.promise;
                }
            }
		});
    	

    });

    return app;
});
