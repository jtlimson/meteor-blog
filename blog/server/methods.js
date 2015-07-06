
Meteor.methods({
  'PostComment': function (data) {
   

    //data.userId = this.userId;
   console.log(data);
    return Posts.update(data);
  },
  'randomString': function() {
    var chars = "abcdefghiklmnopqrstuvwxyz"; 
     
        var randomstring = ''; 
        var string_length = 25;
        for (var i=0; i<string_length; i++) { 
                var rnum = Math.floor(Math.random() * chars.length); 
                randomstring += chars.substring(rnum,rnum+1); 
        }
        //sub.added(this._id,Math.random(),randomstring); 
        console.log(randomstring);
       return randomstring;
  }
});