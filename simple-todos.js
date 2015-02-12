// simple-todos.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
  //attaches submit event to template
  Template.body.events({
    //listens to the submit event on anything with class new task, passes in event
  "submit .new-task": function(event){
    // event.target is form element, text is equal to the value of form input
    var text = event.target.text.value;
    // console.log(event)
    // console.log(text)
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

Template.task.events({
  "click .toggle-checked": function(){
    //this._id gets the unique task
    //$set toggles the checked field
    Tasks.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function(){
    Tasks.remove(this._id);
  }
});
}