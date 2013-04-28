'use strict';


define(['app', "jquery", "d3"], function ( app, $, d3) {
	
	app.directive('miniMap', function(layers, $document, $rootScope, position) {
		
		var map = {};
		
		// Initializing the position:
		map.pos = {'s': 0.15,  'x': 0, 'y': 10};

		// Dom element where the nodes lie:
		map.dom = null;



		// create object for the window
		map.window = {
		// Setup the size:
			'Height': 0,
			'Width': 0
		}

		// Position of the window according to the zoom and the starting position
		var changeWindow = function(newpos) {

			var s =    map.pos.s / newpos.s,
				x = - newpos.x / newpos.s * map.pos.s + map.pos.x,
				y = - newpos.y / newpos.s * map.pos.s + map.pos.y;

			
			map.window.dom.attr('x', 0)
						.attr('y',  0)
						.attr('width', map.window.Width  )
						.attr('height', map.window.Height )
						.attr('transform',  dmat(s, x, y) )
						.attr('fill', 'none')
						.attr('style', 'stroke:#ca6969;stroke-width:'+ 2 / s +';');
			
		}

		var getTransformDisplay = function(mat){

			if(!mat)
				mat = position.matrix();

		   	var newpos = {
	    		's': parseFloat(mat.a),
	    		'x': parseFloat( mat.e),
	    		'y': parseFloat( mat.f)
	    	};
	    	if(isNaN(newpos.s)) newpos.s = 1.0;
	    	if(isNaN(newpos.x)) newpos.x = 0.0;
	    	if(isNaN(newpos.y)) newpos.y = 0.0;
	    
	    	changeWindow(newpos);
		}


		// Set the size of the windows size:
		var setWinSize = function(){

			map.window.Height = $document.height() ;
			map.window.Width = $document.width() / 2 ;

		}


		// Display the matrix transformation from the scale, translation
		function dmat(s, x, y){
		  	  return "matrix("+ s + " 0 0 " + s + " " + x + " " + y + ")";
		}



		console.log('mini-map loaded');
		var oldVal = 0;



	    return {
	    	restrict: 'E',
	    	template: '<div id="min-map"> <div class="cadre"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" ><g transform="translate('+map.pos.x+', '+map.pos.y+') scale('+map.pos.s+')"></g>	</svg> <div> <div class="label-pf center">MAP</div></div>',
	    	replace: true,
	    	scope: false,
	    	link: function(scope, element, attr) {
	    		var g = element.find('g');
	    		layers.getData('figure', function(figure){
	    			
	    			g.append($.parseHTML(figure));
	    			// g.find('path').attr('filter', 'url(#drop-shadow-small)');
	    			element.html(element.html());

	    			d3.select('#min-map svg path').attr('fill','#8A8A8A');

	    			// Windows dom:
					map.window.dom = d3.select('#min-map svg').append('svg:rect')
											.attr('x', map.pos.x )
											.attr('y', map.pos.y )
											.attr('transform',  dmat(map.pos.s, map.pos.x, map.pos.y) )
											.attr('width', $document.width()  )
											.attr('height', $document.height() )
											.attr('fill', 'none')
											.attr('style', 'stroke:#ca6969;stroke-width:'+ 2 / map.pos.s +';');
									

					setWinSize();
					

	    			
	    		});


				



	    		position.on("change", function(evt){
		    		
	    			getTransformDisplay(evt.matrix);

		    	});

		    	$rootScope.$on("sidebar:closed", function(evt){
		    		
					map.window.Width = $document.width();

	    			getTransformDisplay();

		    	});

		    	$rootScope.$on("sidebar:opened", function(evt){
		    		
		    		map.window.Width = evt.targetScope.sizes.right ;

	    			getTransformDisplay();

		    	});

		    	$rootScope.$on("window:resized", function(evt){
		    		
		    		// BUG HERE, does not work properly.
		    		
		    		if($rootScope.close){
		    			map.window.Width = $document.width();
		    			console.log('ok');
		    		}else
		    			map.window.Width = evt.targetScope.sizes.right;

		    		map.window.Height = $document.height() ;
	    			getTransformDisplay();
		    	});
	    	}
	    }

	});
});