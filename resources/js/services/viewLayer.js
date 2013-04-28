
/**
 * Services for layer view
 */

define(['jquery', 'app'], function ($, app) {
  
	app.service('viewLayer', function() {
		
		// Our service:
		var service = {};
		// An array of all registered event:
		var events = new Array();
		// Private current position:
		var position = 0.0;

		service.on = function(name, callback){
			if(!events[name])
				events[name] = new Array();
			events[name].push(callback);
			// var event = jQuery.Event(name);
			// event.position = position;
			// callback(event);
		}

		service.fire = function(name){
			var event = jQuery.Event(name);
			event.position = position;
			$.each(events[name], function(i, callback){
				callback(event);
			});
		}

		service.setPos = function(pos){
			if(pos < 100 ){
				if(pos > 0){
					position = pos;
				}else{
					position = 0;
				}
			}else{
				position = 100;
			}
			service.fire('change');
		}

		service.getPos = function(){
			return position;
		}

		return service;

	});
});