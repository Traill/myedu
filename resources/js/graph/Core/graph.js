'use_strict';

/*
 * Create a Graph and register all the needed event:
 */


define(
    //The array of dependencies
    ["jquery", "d3", "util/extend", "graph/Node/nodeEdu"],

    // We define a new function node which we can extend
    function ($, d3, extend, Node) {


    	var id;
    	var ui = null;
        var _graph = {};

    	//////////////////////////////////////////////
		//											//
		//               Interface					//
		//											//
		//////////////////////////////////////////////

        function Graph (edges) { //_x, _y
            
            extend(_graph, Viva.Graph.graph());

            $.each(edges, function(i, edge){
            	var s = new Node(edge.source, {} );

                var t = new Node(edge.target, {} );

            	_graph.addNode(s.id, s);
                _graph.addNode(t.id, t);
                _graph.addLink(s.id, t.id, {value: edge.value} );
            });
           
            return _graph;
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
