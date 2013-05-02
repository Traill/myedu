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

        function GraphRandom (i, j) { //_x, _y
            
            extend(this, (Viva.Graph.generator()).grid(i, j));

            var i = 0;
            this.forEachNode(function(node){
                node.id = i;
                node.data = new Node(i, {"id": i });
                //console.log(node.id);
                i++;
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

		

        
        return GraphRandom;

    
});
