
define([
  'jquery',
  'underscore',
  'backbone',
  'view/page'
  
], function($,_,Backbone,PageView){

		
   var AppRouter = Backbone.Router.extend({
    routes: {
     
      '': 'showProjects',
     
    },
	
	
  }); 

  var initialize = function(){
   
   var app_router = new AppRouter();
		app_router.on('route:showProjects', function(){
		
			var PageViewObj = new PageView;
			PageViewObj.render();
      
      
		});
      
    Backbone.history.start();
 
  }; 
  return {
    initialize: initialize
  };
});