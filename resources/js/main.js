require.config({
    baseUrl: 'js',
    paths: {
      jquery: 'lib/jquery/jquery',
      angular: 'lib/angular.min',
      bootstrap: 'lib/bootstrap',
      d3: 'lib/d3.v2.min',
      radio: 'lib/radio/radio.min',
      viva:    'lib/vivagraph'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        angular: {
            exports: 'angular'
        }, 
        viva: {
            exports: 'viva'
        },
        d3: {
            exports: 'd3'
        }

    }
});

require([
        'app', 
        'jquery',
        'bootstrap', 
        'directives/height',
        'directives/resizableview',
       // 'directives/display', 
        'controllers/main',
        'controllers/graph',
        'controllers/node'
    ], function (app, $) {
    
    'use strict';
    // use app here
    // console.log(app);
    // console.log('Running jQuery %s', $().jquery);

    angular.bootstrap(document, ['trailhead']);    
});