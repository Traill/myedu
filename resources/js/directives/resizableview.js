'use strict';


define(['app', "jquery", "services/drawer"], function ( app, $ ) {
	var MIN_WIDTH = 450;
	app.directive('ngResizableView', function($document, drawer) {
	    
		// Some size:
	    var startX = 0, win_width = 0, ratio = 0, dragel_w = 0;
	    

	    // Add a queue listener to the event resize:
	    // var lr_queue = [];
	    // var trigger = function(){
	    // 	lr_queue.forEach(function(fct){
	    // 		setTimeout(fct, 1);
	    // 	});
	    // }
	    
	    return {
	    	controller: function(){
	    		return {
	    				onResize: function(fct){
	    					lr_queue.push(fct);
	    				}
	    			}
	    	},
	    	scope: false,
		    link: function(scope, element, attr ) {


		    	// Get the elements:
		    	var elements = {
		    		'left_part': 	$(element).find('div.left_part'), 
					'right_part':	$(element).find('div.right_part'),
					'drag_el':		$(element).find('div.draggable2'),
					'close_btn':	$(element).find('div.close_btn')
				}

				// Initial size:
		    	ratio = 50;
		    	win_width = $document.width();
		    	dragel_w = elements['drag_el'].width();
				
		    	
				scope.small_screen = false;

		    	// return the size with respect to the ratio and the window width:
			    var get_size = function(r, w){
			    	
			    	scope.sizes.window_size = w;

			    	var	left_btn = w * r /100,
			    		dis_drag = 'block',
			    		borderbtn = '1px solid #fff';


			    	if(w < 2 * MIN_WIDTH) {
			    		r = 100;
			    		dis_drag = 'none';
			    		left_btn = w - 50;
			    		scope.small_screen = true;
			    		borderbtn = '1px solid #cdcdcd';
			    	}
			    	scope.sizes.ratio = r;
			    	scope.sizes.left = r/100*w;
			    	scope.sizes.right = (100 - r)/100 * w;
			    	
			   		if(drawer.is_open())
			    		return {
				    		'left_part': 	{ 'width':  (w * r /100) , 'left': 0},
					     	'right_part': 	{ 'width':  (100 - r ) * w /100 -1 , 'left': w * r /100 +1 },
				    		'drag_el': 		{ 'left': w * r /100 - dragel_w, 'display': dis_drag },
				    		'close_btn': 	{ 'left': left_btn, 'border-left': borderbtn}
				    	}
				    else
				    	return {
				    		'left_part': 	{ 'width': w * r /100 +'px', 'left': - (w * r /100) },
					     	'right_part': 	{ 'width': w +"px", 'left': 0 },
				    		'drag_el': 		{ 'left': - dragel_w, 'display': dis_drag},
				    		'close_btn': 	{ 'left': 0 }
				    	}
			   	}

			   	// set size without any transition:
			   	var set_size = function(sizes){
			   		$.each(sizes, function(key, val){
			   			elements[key].css(val);
			   		});

			   		// trigger all binded event:
					 //   trigger();
			   	}

			   	// set size with transition
			   	var set_size_trans = function(sizes){
			   		$.each(sizes, function(key, val){
			   			elements[key].animate(val);
			   		});

			   		// trigger all binded event:
					  //  trigger();
			   	}
		    	
		    	
		    	// Setup initial size:
		    	set_size(get_size(ratio, win_width));

			    // Registering event
		     	elements['drag_el'].bind('mousedown', function(event) {

		     	  	startX = event.screenX - elements['drag_el'].offset().left - elements['drag_el'].width();

		     	  	$document.bind('mousemove', mousemove);
		     	  	$document.bind('mouseup', mouseup);
		     	});
		 		
		 	 	// when dragging: (moving the mouse...)
		     	var mousemove = function(event) {
			     	if(drawer.is_open()){
			     		// offset
			     	  	var x = event.screenX - startX;
			     	  	//test if does not go beyond:
			     	  	x = x > MIN_WIDTH ? (win_width - x) > MIN_WIDTH ? x : win_width - MIN_WIDTH: MIN_WIDTH;
						
				       	// new size for right and left
				       	ratio = x/win_width *100;

				       	// Was:
				       	var old_size = scope.sizes.right;

				       	// Update the view:
				       	set_size(get_size(ratio, win_width));
				     

				     	scope.$emit('window:resized', {'old_size': old_size, 'new_size': scope.sizes.right});
			     	}
		     	};

		 	 	// When stopping dragging
		     	var mouseup = function() {
		     	  	$document.unbind('mousemove', mousemove);
		     	  	$document.unbind('mouseup', mouseup);
		     	};

		     	// When we close the sidebar:
		     	var closing = function(){
		     		
		    		set_size_trans( get_size(ratio, win_width));
		    		
		    		// Wait ending to send event:
		    		setTimeout(function(){

		    			elements['close_btn'].find('i').css({transform: 'rotate(180deg)'});
			    		scope.$digest();
			    		scope.$emit('sidebar:closed');

		    		}, 400);

		    		// Send event now:
		    		elements['close_btn'].find('i').css({transform: 'rotate(180deg)'});
			    	scope.$digest();
			    	scope.$emit('sidebar:closing');

		     	}

		     	// when open the sidebar
		     	var opening = function () {
		     		
		    		set_size_trans( get_size(ratio, win_width) );


		    		// Wait ending to send event:
		    		setTimeout(function(){

		    			elements['close_btn'].find('i').css({transform: 'rotate(0deg)'});
		    		scope.$digest();
		    		scope.$emit('sidebar:opened');

		    		}, 400);

		    		// Send event now:
		    		elements['close_btn'].find('i').css({transform: 'rotate(0deg)'});
		    		scope.$digest();
		    		scope.$emit('sidebar:opening');

		    		
		     	}




		     	// bind event to close the sidebar:
		     	elements['close_btn'].bind('click', drawer.toggle);
		     	drawer.on('open', opening);
		     	drawer.on('close', closing);
		     	drawer.open();

		     	// Bind event when resizing the window:
		     	//([$(window), $document]).forEach(function(a){
					$(window).resize(function(){	
						win_width = $(window).width();

						// Was:
				       	var old_size = scope.sizes.right;

						// compute actual pixel size
				     	var x = ratio * win_width / 100;
				     	//test if does not go beyond:
						if(x > MIN_WIDTH ) {
							if( (win_width - x) > MIN_WIDTH){
						      	// Update the view:
						      	set_size(get_size(ratio, win_width));
						    }else{
						    	// change the size to the min one:
						    	ratio = 100 - (MIN_WIDTH/win_width *100);
						      	// Update the view:
						      	set_size(get_size(ratio, win_width));
						    }
					    }else{
					    	// change the size to the min one:
					      	ratio = MIN_WIDTH/win_width *100;
						   	// Update the view:
						   	set_size(get_size(ratio, win_width));
					    }

					    scope.$digest();
		    			scope.$emit('window:resized', {'old_size': old_size, 'new_size': scope.sizes.right});
					
					//})
				});


		    }
		}

	});
});