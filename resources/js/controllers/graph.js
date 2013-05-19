/*global define */
'use strict';

define(['angular', 'app', 'views/graphic', "graph/Layout/layout", "jquery", "services/graph"], function (angular, app, Graphic, Layout, $) {
    app.controller('graphCtlr', function($scope, $location, drawer, graph) {

		// Create a graphic to display some graphes:
		var g = new Graphic($('#view_graph')[0]);
		
		graph.promise.then(function(){

			// display a common renderer: the forceLayout:
			var layout = new Layout(graph, g);

			layout.run();
			
		})
		
		
		
		drawer.on('change', function(){
			g.fire('rescaled');
		});



		
	});
});
