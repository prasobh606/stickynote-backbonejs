define([
  'jquery',
  'underscore',
  'backbone',
  'collection/PageCollection',
  /* 'model/PageModel', */
  'text!template/list.html',
  'jqueryui'
 ], function($, _, Backbone,PageCollection/* ,PageModel */,pageTemp){
  return Backbone.View.extend({
    el: $('#container'),
	
	initialize:function(){
		this.collection = new PageCollection();
		/* var storage = new Backbone.Collection();
		storage.localStorage = new Backbone.LocalStorage("cards");
		storage.fetch(); */
		var retrievedObject = localStorage.getItem('cardObject');
		if(retrievedObject){
				var storageJson = JSON.parse(retrievedObject);
				this.collection.add(storageJson)
		}
		this.appendData = this.$el.find('#cards ul')
		
	},
	 events: {
	 "click"              :"HideElem",
	 "click .create-item" :"showElm",
     "click .add"         : "AddCard",
	 "click .create-card" :"NoTask",
	 "click .close"       :"close"
    },
	NoTask:function(){
		return false;
	},
	close:function(event){
		event.stopPropagation();
		console.log(event.target);
		var listId = $(event.target).attr('listid');
		var selectedModel = this.collection.where({id:listId});
		this.collection.remove(selectedModel);
		this.render();
	},
	showElm:function(event){
		event.stopPropagation();
		this.$el.find('.create-item').hide();
		this.$el.find('.create-card').fadeIn();
		
		return false;
	},
	HideElem:function(){
		//event.stopPropagation();
		var elm = this.$el.find('.create-card');
		
    	 elm.hide();	
		this.$el.find('.create-item').show();
		
	},
	AddCard:function(event){
		event.stopPropagation();
		var label = $(this.el).find("#content .labelContent").val();
		var data = $(this.el).find("#content .CardContent").val();
		data = data.replace(/\r?\n/g,'<br/>')
		this.HideElem();
		if(data || label){ 
		this.collection.create({ label:label,data: data});
		//this.collection.add({ label:label,data: data});
		
		this.render();
		}
		
	},

    render: function(){
     
      var data = {};
	   
	  this.appendData.empty();
	  // collection
	  var current = this;
		localStorage.removeItem('cardObject');
		localStorage.setItem('cardObject', JSON.stringify(this.collection.toJSON()));
	 this.collection.each(current.add,current);
	  	  //collection ends
	  
    },
	add:function(){
		var data = arguments[0].attributes;
		
		var compiledTemplate = _.template(pageTemp);
		var that = this;
		
		this.appendData.prepend(compiledTemplate({data:data}));
		$(".cards ul").sortable({
			 handle: '.card-label',
			'stop':function() {
				that.updateSort();
			}
			
			})
	},
	updateSort:function(){
		this.updatedArray = [];
		this.clonedCollection = new PageCollection();
		var _this = this;
		this.appendData.find('li').each(function(){

			var id = $(this).attr('listid');
			var updatedModel = _this.collection.where({id:id})
			_this.updatedArray.push(updatedModel[0]);
			//_this.clonedCollection.create(updatedModel.toJSON())
			 
		});	
		// removing elements from local storage
		this.collection.each(function(model){
			model.destroy();
		})
		this.collection.reset();
		// add new elements to collection and local storage
		this.updatedArray = this.updatedArray.reverse()
		$.each(this.updatedArray,function(index,obj){
		   console.log(obj)
			_this.collection.create(obj);
		})
		this.render();
		
	}
  });
 
});