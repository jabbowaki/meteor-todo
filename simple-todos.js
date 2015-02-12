// simple-todos.js
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: [
      { stuff: "Walk the dog" },
      { stuff: "Do the laundry" },
      { stuff: "Eat all the snacks" }
    ]
  });
}