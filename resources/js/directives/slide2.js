'use strict';


define(['app', "jquery", "d3"], function ( app, $, d3 ) {


	app.directive('ngSlideAlt', function($document, position) {
	    var startY = 0, currMar = 0;
	    var orientation = 'top';

	    return {
	    	restrict: 'E',
	    	scope: {
	    		max: '@max',
	    		min: '@min',
	    		val: '@val',
	    		onchange: '&',
	    		onrelease: '&',
	    		horizontal: '@horizontal',
	    		style: '@',
	    		class: '@'
	    	},
	    	transclude: true,
	    	template: '<div style="{{style}}"  class="{{class}}" ng-transclude></div>',
	    	link: function(scope, element, attr) {
	    		
	    		if( angular.isDefined(attr.horizontal)) {
	    			orientation = 'left';
	    		}
	    		
		    	var max = parseFloat(scope.max),
		    		min = parseFloat(scope.min);
		    	var y = 0;
	    		
	    		element.css( orientation,  scope.val + "px");
		     	 // Registering event
		     	element.bind('mousedown', function(event) {

		     		event.preventDefault();

		     		if( angular.isDefined(attr.horizontal))
		     	   		startY = event.screenX - startY;
		     	   	else
		     	   		startY = event.screenY - startY;
		     	   	
		     	   	currMar = parseFloat(element.css(orientation));

		     	   	element.addClass('selected');
		     	   	
		     	   	$document.bind('mousemove', mousemove);
		     	   	$document.bind('mouseup', mouseup);

		     	});
		 		
		 	 	// when dragging: (moving the mouse...)
		     	var mousemove = function(event) {
		  			
		  			event.preventDefault();
		  			if( angular.isDefined(attr.horizontal))
		     	   		y = event.screenX - startY;
		     	   	else
		     	   		y = event.screenY - startY;

		     	   	var current_val = currMar + y;

		     	   	
		     	   	current_val = current_val <  max? current_val > min ? current_val: min : max;
		     	   	
		     	   	

		     	   	var perc = (current_val - min) / max * 100;

		     	   	var event = jQuery.Event('change');
		     	   	scope.current_val = perc;
		     	   	event.current_val = perc;
		     	   	console.log(perc + " " + max + " " + current_val);
		     	   	position.setScale((perc + 0.1)*5.0/100);

		     	   	
		     	   	if(angular.isDefined(scope.onChange))
		     	   		scope.onChange(event);
		     	   
		     	}


		 	 	// When stopping dragging
		     	var mouseup = function() {

		     	   	$document.unbind('mousemove', mousemove);
		     	   	$document.unbind('mouseup', mouseup);
	
		     	   	element.removeClass('selected');
					
					var event = jQuery.Event('release');
		     	   	if(angular.isDefined(scope.onRelease))
		     	   		scope.onRelease(event);

		     	}


		     	
				position.on('change', function(evt){

					var perc = (position.s() - 0.1)/5.0 ;
					var val = perc  * max + min;
					
					val = val <  max? val > min ? val: min : max;
		     	   	
		     	   	element.css(orientation,  Math.round(val) + "px");
					
				});


		    }

	    }
	  });
});