define(["models/nodes", "models/search", "views/views"], function (nodes, views) {


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

	// Add to controller and views
	controller.model = nodes;
	controller.views = views;

	// Add selected and current node(s) from last session
	controller.model.broadcastScheduled();


	// Return the controller
	return controller;

});
