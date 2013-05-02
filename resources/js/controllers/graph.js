/*global define */
'use strict';

define(['angular', 'app', 'views/graphic', 'graph/Core/graph_random', "graph/Layout/layout"], function (angular, app, Graphic, GraphRandom, Layout) {
    app.controller('graphCtlr', function($scope, $location, drawer) {

    	// Create a graphic to display some graphes:
		var g = new Graphic($('#view_graph')[0]),
		// For now, use Vivagraph random stuff:
		graph = new GraphRandom(10, 10),

		// display a common renderer: the forceLayout:
		layout = new Layout(graph, g);

		layout.run();

		drawer.on('change', function(){
			g.fire('rescaled');
		});
		
		


		
	});
});
