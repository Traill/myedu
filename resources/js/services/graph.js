
/**
 * Services for graph:
 * this register the current graph 
 */

define(['jquery', 'app', 'graph/Core/graph', 'util/extend'], function ($, app, Graph, extend) {
  


	app.factory('graph', function($http, $q) {
		
		// Our graph:
		var graph = {};

		var currentID = null;

		
		var deferred = $q.defer();

		$http.get('ajax/edges').success(function (data) {

			var edges = data.edges;
			
			// Publish how many edges we have
			console.log('Loading '+edges.length + ' edges...')

			// Create the graph
			extend(graph, new Graph(edges));


			// Resolve:
			deferred.resolve();

	    });

		// Promise pattern: loading it before anything else:
		graph.promise = deferred.promise;

	    deferred.promise.then(function(){
	    	graph.__defineSetter__("current", function(nodeID){

			   	if(currentID != null){
			   		var oldNode = graph.getNode(currentID);
			   		// deselection it
			   		oldNode.data.deselect(oldNode);
			   	}
			   	currentID = nodeID;
			   	var n = graph.getNode(nodeID);
			   	n.data.select(n);
			});
	    });

		return graph;

	});
});