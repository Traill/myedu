/*global define */
'use strict';

define(['angular', 'app', 'views/graphic', 'graph/Core/graph', "graph/Layout/layout", "jquery"], function (angular, app, Graphic, Graph, Layout, $) {
    app.controller('graphCtlr', function($scope, $location, drawer) {

		// Create a graphic to display some graphes:
		var g = new Graphic($('#view_graph')[0]);
		// Load the ids:
		$.getJSON('ajax/edges', function(data){
			var edges = data.edges;
			
			console.log('Loading '+edges.length + ' edges...')

			// Create the graph
			var graph = new Graph(edges),

			// display a common renderer: the forceLayout:
			layout = new Layout(graph, g);

			layout.run();

			
		});
		
		
		drawer.on('change', function(){
			g.fire('rescaled');
		});



		
	});
});
