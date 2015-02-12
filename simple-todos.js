// simple-todos.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({});
    }
  });
  Template.body.events({
  "submit .new-task": function(event){
    var text = event.target.text.value;

    Tasks.insert({
      text: text,
      createdAt: new Date()
    });
    //clears form
    event.target.text.value = "";
    //Prevent default form submit
    return false;
  }
});
}