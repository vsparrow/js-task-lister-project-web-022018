class TaskLister {
  // your solution here
  constructor(){
    this.test = "test";
    this.tasks = {"thisIsATaskList": [description: "someTask", priority: 5]};
  }//end constructor



  render() {
    return (`<h1>Welcome to Flavortown</h1>`);
  }
}


//
// {
//   taskListsNameA: [{taskDescription: "", priority: Int },{taskDescription: "", priority: Int},etc..]
//   taskListsNameB: [{taskDescription: "", priority: Int },{taskDescription: "", priority: Int},etc..]
//   taskListsNameC: [{taskDescription: "", priority: Int },{taskDescription: "", priority: Int},etc..]
// }
// tasks{ taskListNameA: [{taskDescription: "", priority: int}]}
// tasks{ taskListNameA: [{taskDescription: "", priority: int}]}
