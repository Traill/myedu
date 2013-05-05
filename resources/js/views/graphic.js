define(["radio", "viva", "util/extend"], function(radio, v, extend) {

	
	var type;
	
	
	//////////////////////////////////////////////
	//											//
	//               Interface					//
	//											//
	//////////////////////////////////////////////
	function Graphic(_element, _type){
		type = _type || "svg";

		// Only SVG so far:
		if (type != 'svg') {
            throw {
                message: 'Invalid type identifier'
            };
        }
        // Later we can add webGL!

        // Extend this object with the Vivagraph object
        // To have all the feature
        // 
        // In the future, we should rewrite it to fit exactly our needs
        extend(this,  Viva.Graph.View.svgGraphics() );
		// Init the DOM
		this.init(_element);

		this.events = function () {
			
		

		}

		// Customize view:
		this.node(function(node) {
			
			return node.data.ui;

		});

		this.placeNode(function(node, pos){
		    //console.log(node);
		    node.data.place(node, pos);
		});

		return this;

	}



	
	

	//////////////////////////////////////////////	
	//											//
	// 				PRIVATE function:			//
	// 											//
	//////////////////////////////////////////////
	
	



	//////////////////////////////////////////////
	//											//
	//            Return Interface				//
	//											//
	//////////////////////////////////////////////

	
	return Graphic;

});
