
//Meteor.subscribe("posts",key);


  Template.post.events({
    'click .btn' : function(){
      var comment = $("textarea").val();
     var email =  Meteor.user().emails[0].address;
     var author =  Meteor.user().emails[0].address;
     Posts.update(this._id,{$push :{ comments: {body:comment,author: author ,  email:email}}});
     
    }

  }); 
  Template.postblog.events({
    'click .btn' : function(event, template){
      var date = new Date();
      var chars = "abcdefghiklmnopqrstuvwxyz"; 
        var randomstring = ''; 
        var string_length = 25;
        for (var i=0; i<string_length; i++) { 
                var rnum = Math.floor(Math.random() * chars.length); 
                randomstring += chars.substring(rnum,rnum+1); 
        }
        var body = template.$('[name=body]').val();
        var title = template.$('[name=title]').val();
        var author = Meteor.user().emails[0].address;
        var email = Meteor.user().emails[0].address;
        var rtags = template.$('[name=tags]').val()
        var tags = new Array();
        tags = rtags.split(",");
     var data = {
       body:body,
       title:title,
       author: author,
       email:  email, 
       tags: tags,
       permalink: randomstring,
       date: date,
     };
     console.log(data);
     Posts.insert(data, function(err){
       if(err){alert("error" + err);}
       
        //console.log(data._id)
      //  Posts.update(data._id,{ $addToSet: {tags:[tags]}});
     });
    
     //this.render('/');
     Router.go('/');
    }
  });

