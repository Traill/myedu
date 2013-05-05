'use_strict';

/*
 * Create a Node and register all the needed event:
 */


define(
    //The array of dependencies
    ["d3", "util/extend", "viva", 'jquery'],

    // We define a new function node which we can extend
    function (d3, extend, vavi, $) {




    	//////////////////////////////////////////////
		//											//
		//               Interface					//
		//											//
		//////////////////////////////////////////////

        function Node (_id, data) { //_x, _y
            // Properties
            var id;
    		var ui = null;


			//to be complient with force layout;
			// this.x =			x || initPosition();
			// this.y =			y || initPosition();
			//this.index =		index || null;

			if (typeof _id === 'undefined') {
                throw {
                    message: 'Invalid node identifier'
                };
            }else{
            	id = _id;
            }
            
            // Add everything to this object:
            extend(this, data)
			



			//////////////////////////////////////////////
			//											//
			//            Public function				//
			//											//
			//////////////////////////////////////////////


			// Just a getter for the id (we don't want to set it in the run time)
			// Interesting link to understand getter and setter:
			// http://ejohn.org/blog/javascript-getters-and-setters/
			this.__defineGetter__("id", function(){
		        return id;
		    });


		    // A totally generic function to generate a simple UI for a node
		    // Overwrite this function for specific case:

		    this.__defineGetter__("ui", function(){
		       
		    	if(ui == null){
		    		ui = generate_simple();
		    		listenEvent(this);
		    	}


		    	return ui;
		    });

		    // Generic placeNode:
		    this.place = function (node, pos) {
		    	var nodeSize = node.ui.attr('r');
		    	
				node.ui.attr('cx', pos.x).attr('cy', pos.y );
		    }


		    this.click = this.clickBck || function(){
		    	window.location = "#/node/" + id;
		    }


		    //////////////////////////////////////////////
			//											//
			//                Events					//
			//											//
			//////////////////////////////////////////////
			var listenEvent = function(node){

				$(ui).on('click', function(){
					node.click();
				});
			}

        }




        //////////////////////////////////////////////
		//											//
		//             Private function				//
		//											//
		//////////////////////////////////////////////


        // Find initial position of the node, else create it.
		var initPosition = function(id) {
			var pos = {};
			if(position.get(id) == null){
				
				pos.x = config['graph_width']  * Math.random();
				pos.y = config['graph_height'] * Math.random();
				
			}else {
				pos = position.get(id);
			}
			return pos;
		
		}


		var generate_simple = function(){
			var ui = Viva.Graph.svg('circle')
                     .attr('r', 5)
                     .attr('fill', '#000000')
                     .attr('class', 'node');

            //console.log(ui);
            return ui;
		}



        
        return Node;
    }
);


