'use strict';


define(['app', "jquery", "d3", "services/viewLayer"], function ( app, $, d3 ) {


	app.directive('ngSlide', function($document, layers, viewLayer) {
	    var startY = 0, currMar = 0;
	    
	    return {
	    	link: function(scope, element, attr) {
	    			// console.log(scope);
	    			// console.log(attr);
	    		var my_slider = $('#slider');
		    	var n = layers.getNumber(),
		    		h = Math.floor(my_slider.height() / (n + 1)),
		    		max = n * h,
		    		min = h;
		    	var y = 0;
	    		
	    		element.css('top',  (h -5) + "px");
		     	 // Registering event
		     	element.bind('mousedown', function(event) {

		     		event.preventDefault();
		     	   	startY = event.screenY;
		     	   	currMar = parseFloat(element.css('top'));
		     	   	element.addClass('selected');
		     	   	
		     	   	$document.bind('mousemove', mousemove);
		     	   	$document.bind('mouseup', mouseup);

		     	});
		 		
		 	 	// when dragging: (moving the mouse...)
		     	var mousemove = function(event) {
		  			
		  			event.preventDefault();
		     	   	y = event.screenY - startY;
		     	   	var val = currMar + y;
		     	   	//console.log(val + " " + max + " " + min);
		     	   	val = val <  max? val > min ? val: min : max;

		     	   	//if(  val <  max && val > min ) {
		     	   	//console.log(val);

		     	   	// Register event:
		     	   	var perc = (val - min) / max * 100;
		     	   	viewLayer.setPos(perc);
		     	   //}
		     	}


		 	 	// When stopping dragging
		     	var mouseup = function() {

		     	   	$document.unbind('mousemove', mousemove);
		     	   	$document.unbind('mouseup', mouseup);
	
		     	   	element.removeClass('selected');
	
		     	   	var closest = (Math.round( parseFloat(element.css('top'))  / h) * h);
		     	   	closest = (closest - min) / max * 100;
		     		viewLayer.setPos(closest);

		     	}


		     	viewLayer.on('change', function(evt){
		     		var perc = evt.position;
		     		var val = perc / 100 * max + min;

					element.css({'top': val + "px"});
				});


		    }

	    }
	  });
});