'use strict';


define(['app', "jquery", 'd3', 'services/position'], function ( app, $, d3 ) {
	
	app.directive('ngDisplay', function($window, $rootScope) {
	    
		
	    return {
	    	require: '^ngResizableView',
	    	restrict: 'A',
	    	scope: false,
	    	controller: function(){
	    		
	    	},
	    	link: function(scope, element, attr, resizableWindow) {
	    		
	    		
	    		scope.display.pos = {};
	    		
	    		// Get the dom element svg of the display:
	    		rootSVG = element.children('svg')[0];
	    		$root = $(rootSVG);
	    		// Get the viewport element:
		    	g = $root.find('#viewport')[0];

	    		// Setup the layers services for refresh:
				layers.setElement(element.attr('id'), rootSVG);
	    		
		    	

				var updatePos_evt = function(){
	    			
		    		position.set(g.getCTM());
 	
		    	};


				// lock the root element and work on it:
				layers.do_after_refreshing(function(){

					// Update the dom element svg of the display:
		    		rootSVG = element.children('svg')[0];
		    		$root = $(rootSVG);
		    		// Get the viewport element:
			    	g = $root.find('#viewport')[0];

					// Enable the panning:
		    		$root.svgPan('viewport');

		    		// Register event to sync the scope:
		    		$root.on('mousemove', updatePos_evt);
		    		$window.addEventListener('mousewheel', 		updatePos_evt, false); // Chrome/Safari/others
  					$window.addEventListener('DOMMouseScroll',  updatePos_evt, false); // Firefox

				});
	    		


				// When position is changed, updated view:
				position.on('change', function(e){
					setPos(e.matrix);
				});

	    		
				function pan_middle(oldv, newv){
					var newmat = position.get().matrix;
	    			newmat.e += (newv - oldv)/2;
	    			
	    			animatePos(newmat);

				}
				
				// Bind event when the side is closed
				$rootScope.$on('sidebar:closing', function(evt){
	    			var oldv = evt.targetScope.sizes.right,
	    				newv = evt.targetScope.sizes.window_size;

	    			pan_middle(oldv, newv);
	    		});
	    		$rootScope.$on('sidebar:opening', function(evt){
	    			var newv = evt.targetScope.sizes.right,
	    				oldv = evt.targetScope.sizes.window_size;

	    			pan_middle(oldv, newv);
	    		});
	    		$rootScope.$on('window:resized', function(evt, args){
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