Meteor.publish('posts',function(query,option){
	//console.log("server publish option" + option)
	console.log(JSON.stringify(query)+","+JSON.stringify(option));
	return Posts.find(query,option);
});

Meteor.publish('tags', function(tag){
 	var sub = this;
	var pipeline = [
		{$project: {tags:1, author: 1, title:1, permalink:1 }},
		{$unwind:"$tags"},
		{$match: {"tags": tag}}];
	//console.log(pipeline);
	var results = Posts.aggregate(pipeline);
	var arrayLength = results.length;
	for(var i=0; i < arrayLength; i++){
		  var tags = results[i];
		  //console.log(tags);
          sub.added('posts', Math.random(), tags);
	}
	sub.ready();
	//console.log(sub);
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});