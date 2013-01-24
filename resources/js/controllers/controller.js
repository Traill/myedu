define(["radio", "models/nodeList", "models/linkList", "models/search", "models/graph", "views/views", "models/saveLink"], 
		function (radio, nodeList, linkList, search, graph, views, saveLink) {


	//////////////////////////////////////////////
	//											//
	//               Interface					//
	//											//
	//////////////////////////////////////////////
	var controller = {};


	//////////////////////////////////////////////
	//											//
	//              Initialize					//
	//											//
	//////////////////////////////////////////////

	// initialize graph
	graph.init(nodeList.getNodes(), linkList.getAllLinks());


	// Load saved data
	saveLink.init();


	// Return the controller
	return controller;

});
