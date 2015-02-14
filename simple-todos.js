// simple-todos.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function() {
      if (Session.get("hideCompleted")){
        //if hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function(){
      return Session.get("hideCompleted");
    },
    incompleteCount: function(){
      return Tasks.find({checked: {$ne: true}}).count();
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
      Meteor.call("addTask", text);
    //clears form
    event.target.text.value = "";
    //Prevent default form submit
    return false;
  },

  "change .hide-completed input": function(event){
    Session.set("hideCompleted", event.target.checked);
  }
});

Template.task.events({
  "click .toggle-checked": function(){
    //this._id gets the unique task
    //$set toggles the checked field
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function(){
    Meteor.call("deleteTask", this._id);
  }
});
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addTask: function(text) {
    if (! Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId){
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked){
    Tasks.update(taskId, {$set: {checked: setChecked} });
  }
})