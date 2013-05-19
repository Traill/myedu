/*global define */
'use strict';

define(['angular', 'app'], function (angular, app) {
    app.controller('nodeCtrl', function($scope, $location, $routeParams, graph) {

    	// Publish the event the route has changed through radio:
    	graph.promise.then(function(){
    		graph.current = $routeParams.node;
    	});
    	
    	
    	// Load the data for the node:
    	$.getJSON('ajax/node/' + $routeParams.node, function(data){
    		
    		// Ok, still bug with string:
    		var data = $.parseJSON(data.node);
    		
    		// Setup the data:
    		$scope.node = data;
    		$scope.node.id = $routeParams.node;
    		$scope.node.section = $routeParams.node.replace(/^(\D+)(.*)$/i,'$1');

    		// Update the view:
    		$scope.$digest();
    	});
		
	});
});
