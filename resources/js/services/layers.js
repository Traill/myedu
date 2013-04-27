
/**
 * Services for the layers
 */

define(['jquery', 'app', 'json!../../../index.php/ajax/bodies'], function ($, app, bodies_data) {
  
	app.service('layers', function() {
		
		// At start, we don't have any layers: loading it lazily
		var layers = { 
				'figure': {
					id: 0,
					name: 'figure', 
					attr: {
						'filter': "url(#drop-shadow)"
					}
				}, 
				'nervous_system': {name: 'nervous_system', id: 1, attr: {'style': 'display:none'} },
				'veins': {name: 'veins', id: 2, attr: {'style': 'display:none'}},
				'organs': {name: 'organs', id: 3, attr: {'style': 'display:none'}},
				'skeleton': {name: 'skeleton', id: 4, attr: {'style': 'display:none'}},
				'muscles': {name: 'muscles', id: 5},
				'outside': {name: 'outside', id: 6}
			},
			rootSVG = null,
			rootID = '',
			loading = 0,
			semaphore = [],
			layersService = {},
			afters = [],
			bodies = [],
			body = 0,

			// function that lock the work 
			get_lock = function(){

				var self = {};
				semaphore.push(self);
				self.destroy = function(){
					var i = semaphore.indexOf(self);
					if(i < 0) {
						console.error('You have already release the work');
						return;
					}
					semaphore.splice(i, 1);
				}
				// return the unlock function
				return {
					unlock: function(){ 
						// console.log('Destroying '+ self);
						self.destroy();
						refresh();
					}
				};
			},
			refresh = function(){
				// We need to refresh the svg element because of the implementation of
				// the SVG in html5
				if(rootID != '' && semaphore.length == 0 ){
					$('#'+rootID).html($('#'+rootID).html() );
					
					afters.forEach(function(a){
						// console.log(a);
						a();
					});
					console.log('Content refresh!');
				}
			},

			init = function(){
				// Init layers?
				// Done in static way

				// Init bodies:
				
				$.each(bodies_data, function(i){
					bodies[i] = bodies_data[i].attributes
				});
				body = bodies_data[0].attributes.id;
				console.log('layers initialized')
			}


		// PUBLIC:
		
		// Work on the svgRoot without loosing content:
		layersService.do = function(fct){
			var lock = get_lock();
			fct();
			lock.unlock();
		}

		// Re-attach all the element to the new created SVG:
		layersService.do_after_refreshing = function(fct){
			afters.push(fct);
		}
		layersService.setElement = function(Elid){
			//rootSVG = El;
			rootID = Elid;
		}
		layersService.getData = function(layer_label, callback ){
			var lock = get_lock();
			
			if( !layers[layer_label] ){
				console.error('No layer with name '+layer_label);
				lock.unlock();
			}else if( !layers[layer_label].data ) {
				loading++;
				$.get('data/'+layer_label+'.svg', function(data){
			   			
			   			// Keep data in memory:
			   			layers[layer_label].data = data;
			   			loading--;
			   			callback(data, layers[layer_label].attr);
			   			// Release the lock:
			   			lock.unlock();

			   		}, 'text');
			}else{
				callback(layers[layer_label].data);
				lock.unlock();
			}

		}

		layersService.getNodes = function(layer_label, callback){

			// if not initialized, create object:
			if( ! layers[layer_label].nodes) layers[layer_label].nodes = {};
			// Retrieve element from server if not already done:
			if( ! layers[layer_label].nodes[body]){
				$.get('index.php/ajax/nodes/'+layers[layer_label].id + '/' + body, 
					function(data){
				   			
				   		// Keep data in memory:
				   		layers[layer_label].nodes[body] = data;
				   		callback(data);
				   		

				   	}, 'json');
			}else{
				callback(layers[layer_label].nodes[body]);
			}
		}
		


		layersService.getName = function(){
			var name = [];
			
			$.each(layers, function(id, val){
				name[val.id] = id;
			});
			// name.reverse();
			return name;
		}


		layersService.setBody = function(index){
			body = index;
		}

		layersService.getBody = function(){
			return body;
		}

		layersService.getBodies = function(){
			return bodies;
		}
		layersService.getSVG = function(){
			return rootID;
		}
		layersService.getNumber = function(){
			var size = 0;
		    $.each(layers, function(){
		    	size++;
		    });
		    return size;
		}
		// init:
		init();
		return layersService;

	});
});