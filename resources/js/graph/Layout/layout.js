'use_strict';

/*
 * Create a Graph and register all the needed event:
 */


define(
    //The array of dependencies
    ["jquery", "util/extend", "viva"],

    // We define a new function node which we can extend
    function ($, extend, vavi) {



    	//////////////////////////////////////////////
		//											//
		//               Interface					//
		//											//
		//////////////////////////////////////////////

        function Layout (graph, graphics, options) { //_x, _y
            
            options = options || {};
            options.graphics = graphics;
            options.container = $(graphics.getSvgRoot()).parent()[0];
            
            extend(this, Viva.Graph.View.renderer(graph, options));


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

		

        
        return Layout;

    
});
