'use_strict';

/*
 * Create a Node and register all the needed event:
 */


define(
    ["graph/Node/node", "util/extend"],

    // Node is a constructor, eh!
    function (Node, extend) {


    	
        

    	//////////////////////////////////////////////
		//											//
		//               Interface					//
		//											//
		//////////////////////////////////////////////

        function NodeEdu (_id, data) {

            var id = _id;
            var ui = null;

            // we are etending the default node:
            extend(this, new Node(_id, data) );

            // node's UI:
            this.__defineGetter__("ui", function(){
               
                if(ui == null){
                    
                    
                    ui = Viva.Graph.svg('circle')
                        .attr('r', 5)
                        .attr('fill', colorBySection(_id) )
                        .attr('class', 'node');




                    listenEvent(this);
                }


                return ui;
            });


            // Overwrite from the default one:
            // New place method, that register pos
            this.place = function (node, pos) {
                var nodeSize = node.ui.attr('r');

                // Register the position in the node:
                node.data.pos = pos;
                // Update the view:
                node.ui.attr('cx', pos.x).attr('cy', pos.y );
                // Publish the event:
                // [TODO]
            }



            // Overwrite of the click function:
            // 
            this.click = function(){

                // Update the view panel:
                window.location = "#/node/" + id;

                // Publish the event
                // [TODO]
            }

            // Select node:
            this.select = function(node){
                node.ui.attr('fill', '#ff0000');
                node.ui.attr('class', 'node current');
            }
            // Deselect
            this.deselect = function(node){
                node.ui.attr('fill', colorBySection(_id));
                node.ui.attr('class', 'node');
            }

            //////////////////////////////////////////////
            //                                          //
            //                Events                    //
            //                                          //
            //////////////////////////////////////////////
            var listenEvent = function(node){

                $(ui).on('click', function(){
                    node.click();
                });


            }

        }


       

        function colorBySection(NodeID){

            // regex to get only the section:
            var s = NodeID.replace(/^(\D+)(.*)$/i,'$1');

            switch(s){
                case "COM":
                    return "#55d1a7"; // green - blue
                case "CS":
                    return "#5595d1"; // blue
                default: 
                    return "#000000";
            }


        }

        
        



        
        return NodeEdu;
    }
);


