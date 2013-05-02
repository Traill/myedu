'use strict';
/*
 *	This directive create a svg display where you can add any element
 *	It manages the zoom and pan and update the services
 */


define(['app', "jquery", 'd3', 'radio', 'services/position'], function ( app, $, d3, radio ) {
	
	app.directive('ngDisplay', function($window) {
	    
		// the element that manage the resizing and pan:
		var g = null,

		// Set the position according to the matrix
		    setPos = function(matrix){
	    	 var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";

            g.setAttribute("transform", s);
	    },

	    // Animate it:
	    animatePos = function(matrix){
	    	 var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";

            d3.select(g).transition().attr("transform", s).each("end", function(){
            	position.set(matrix);
            });;

	    };


	    // return the directives:
	    return {
	    	restrict: 'E',
	    	scope: {
	    		'width': '@',
	    		'height': '@',
	    		'id': '@'
	    	},
	    	replace: true,
	    	template: '<svg>{{test}} </svg>',
	    	controller: function(){
	    		// Here we should have methods that helps display any element
	    		// However there is no way to catch from the dom.
	    	},
	    	link: function(scope, element, attr, drawer, position, $window) {
	    		
	    		
	    		// Create and set the zoom and pan:
	    		element.svgPan('viewport');
	    		// Get the viewport element:
		    	var g = element.find('#viewport')[0];


		    	// Function to handle event:
		    	var updatePos_evt = function(){
	    			// (view -> model)
		    		position.set(g.getCTM());
 	
		    	};
		    	// Register event to sync the scope: (view -> model)
		    	element.on('mousemove', updatePos_evt);
		    	$window.addEventListener('mousewheel', 		updatePos_evt, false); // Chrome/Safari/others
  				$window.addEventListener('DOMMouseScroll',  updatePos_evt, false); // Firefox
	    		


				// When position is changed, updated view: (model -> view)
				radio('position:change').subscribe(function(e){
					setPos(e.matrix);
				});

	    		
	    		// function to center the view when we change the size of the view:
				function pan_middle(oldv, newv){
					var newmat = position.get().matrix;
	    			newmat.e += (newv - oldv)/2;
	    			
	    			animatePos(newmat);

				}
				


				// Bind event when the side is closed
				radio('sidebar:closing').subscribe(function(evt){
	    			var oldv = evt.targetScope.sizes.right,
	    				newv = evt.targetScope.sizes.window_size;

	    			pan_middle(oldv, newv);
	    		});
	    		radio('sidebar:opening').subscribe(function(evt){
	    			var newv = evt.targetScope.sizes.right,
	    				oldv = evt.targetScope.sizes.window_size;

	    			pan_middle(oldv, newv);
	    		});
	    		radio('window:resized').subscribe(function(evt, args){
	    			var newv = args.new_size,
	    				oldv = args.old_size;
	    			var newmat = position.matrix();
	    			newmat.e += (newv - oldv)/2;
	    			
	    			setPos(newmat);
	    			pan_middle(oldv, newv);
	    		});
	    	}	
	    }

	});
});