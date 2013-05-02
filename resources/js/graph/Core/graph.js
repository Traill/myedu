'use_strict';

/*
 * Create a Graph and register all the needed event:
 */


define(
    //The array of dependencies
    ["jquery", "d3", "util/extend", "graph/Node/node"],

    // We define a new function node which we can extend
    function ($, d3, extend, Node) {


    	var id;
    	var ui = null;


    	//////////////////////////////////////////////
		//											//
		//               Interface					//
		//											//
		//////////////////////////////////////////////

        function Graph (nodes) { //_x, _y
            
            extend(this, Viva.Graph.graph());

            $.each(nodes, function(i, nodeData){
            	var n = new Node(nodeData);

            	this.addNode(n.id, n);
            });
           

        }




        //////////////////////////////////////////////
		//											//
		//             Private function				//
		//											//
		//////////////////////////////////////////////


        

		//////////////////////////////////////////////
		//											//
		//                Events					//
		//											//
		//////////////////////////////////////////////

		

        
        return Graph;

    
});
