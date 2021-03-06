define(function () {

	var config = new Array();

	// // Radius for the node:
	// config['radius'] = 10;
	// config['radius_selected'] = 16;
	// 
	// // Width of a edge:
	// config['edgeSize'] = 1.5;
	// config['edgeSize_hover'] = 5;
	// 
	// 
	// // Zoom parameters:
	// config['zoomMin'] = 0.02;
	// config['zoomMax'] = 1;
	// config['nbIncrement'] = 40;
	// config['zoomInit'] = 0.5;

	// Radius for the node:
	config['radius'] = 4;
	config['radius_selected'] = 6;
	
	// Width of a edge:
	config['edgeSize'] = 1;
	config['edgeSize_hover'] = 3;
	
	
	// Zoom parameters:
	config['zoomMin'] = 0.1;
	config['zoomMax'] = 5;
	config['nbIncrement'] = 40;
	config['zoomInit'] = 1;


	// graph force layout size:
	config['graph_width'] = 1200;
	config['graph_height'] = 700;
	

	config['talk_duration'] = 30;



	config['conference_data'] = "http://ipgwww.epfl.ch/~arnfred/papers/";
	config['conference_abbr'] = "ita2013";
	config['conference_name'] = "Information Theory and Applications Workshop";
	config['conference_place'] = "Catamaran Resort, San Diego";

	return config; 

});
