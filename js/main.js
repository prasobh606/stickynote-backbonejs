
require.config({
	
  paths: {
    jquery: 'libs/jquery_1.8',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
	localstorage: "libs/backbone.localStorage-min",
	jqueryui:	"libs/jquery-ui",
	template:'../template',
	text: 'text',
	
  },
   shim: {
        underscore: {
			exports: '_',
			deps: [],
		},
		backbone: {
		  deps: ["underscore", "jquery"],
		  exports: "Backbone"
		},
		localstorage: {
		  deps: ['backbone'],
		  exports: 'localstorage'
		},
		jqueryui: {
		  deps: ['jquery'],
		  exports: 'jquery-ui'
		}
		
  } 

});

require([

  // Load  app module and pass it to definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});