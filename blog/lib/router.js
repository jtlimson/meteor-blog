
Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'templatebody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'loading'
  //yieldTemplates: {
  //  'footer': {to: 'footer'},
  //  'nav': {to: 'nav'}
  //}
  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
 
});

Router.map(function() {

 this.route('/post/',{
   path:'/post/:_id',
   waitOn: function(){
     //var key = { fields:{comments: {$slice: 10}} ,$sort:-1};
     var key={};
     return Meteor.subscribe("posts",{permalink: this.params._id},key);
   },
   data:  function() {
       var id = this.params._id;
       return Posts.findOne({"permalink":id});
       
   },
   action: function(){
    // if(ready())
     this.render();
   }
  });  
 this.route('list',{
   path:'/',
   waitOn: function(){
     return Meteor.subscribe("posts",{},{sort: {date:-1},limit:20});
   },
   data : {
     posts: function(){
       return Posts.find(); 
     }
   },
   action: function(){
     this.render();
   }
 });
 this.route('tags',{
   path: 'tags/:_id',
   waitOn: function(){ 
     return Meteor.subscribe("tags", this.params._id);
   },
   data : {
     tags: function(){
      return Posts.find();
     }
   },
   action: function(){
     this.render();
   }
 });
  this.route('login',{
      
    
  });
  this.route('postblog',{
      path: 'create',
      waitOn: function(){
        return Meteor.subscribe("tags");
      },
      action: function(){
        this.render();
      }
  });
});