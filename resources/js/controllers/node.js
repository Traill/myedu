/*global define */
'use strict';

define(['angular', 'app'], function (angular, app) {
    app.controller('nodeCtrl', function($scope, $location, $routeParams) {

    	console.log($routeParams.node)
    	// Load the data for the node:
    	$.getJSON('ajax/node/' + $routeParams.node, function(data){
    		var data = $.parseJSON(data.node);
    		console.log(data);
    		$scope.node = data;
    		$scope.node.id = $routeParams.node;
    		$scope.node.section = $routeParams.node.replace(/^(\D+)(.*)$/i,'$1');
    		$scope.$digest();
    	});
		
	});
});
