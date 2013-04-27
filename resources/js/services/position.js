
/**
 * Services for layer view
 */

define(['jquery', 'app'], function ($, app) {
  

	// Constant:
	var MAX_ZOOM = 5.0, MIN_ZOOM = 0.1;

	app.service('position', function() {
		
		// Our service:
		var service = {};
		// An array of all registered event:
		var events = new Array();
		// Private current position:
		var position = {
			s: 1.0,
			x: 0.0,
			y: 0.0,
			matrix: {}
		};

		service.on = function(name, callback){
			if(!events[name])
				events[name] = new Array();
			events[name].push(callback);
		}

		service.fire = function(name){
			var event = jQuery.Event(name);
			event.position = position;
			event.matrix = position.matrix;
			$.each(events[name], function(i, callback){
				callback(event);
			});
		}

		service.set = function(matrix){
			//console.log(matrix);
			
			// Climb value:
			if(matrix.a < MIN_ZOOM){
				matrix.a = MIN_ZOOM;
				matrix.d = MIN_ZOOM;
			}

			if(matrix.a > MAX_ZOOM){
				matrix.a = MAX_ZOOM;
				matrix.d = MAX_ZOOM;
			}


			position.matrix = matrix;
	    	position.s = matrix.a;
	    	position.x = matrix.e;
	    	position.y = matrix.f;
			service.fire('change');
		}

		service.setScale = function(s){

			position.matrix.a = s;
			position.matrix.d = s;
			position.s = s;

			if(s < MIN_ZOOM){
				matrix.a = MIN_ZOOM;
				matrix.d = MIN_ZOOM;
				position.s = MIN_ZOOM;
			}

			if(s > MAX_ZOOM){
				matrix.a = MAX_ZOOM;
				matrix.d = MAX_ZOOM;
				position.s = MIN_ZOOM;
			}

			position.matrix.a = s;
			position.matrix.d = s;
			
			service.fire('change');
		}

		service.get = function(){
			return position;
		}

		service.s = function(){
			return position.s;
		}

		service.y = function(){
			return position.y;
		}

		service.x = function(){
			return position.x;
		}

		service.matrix = function(){
			return position.matrix;
		}


		return service;

	});
});