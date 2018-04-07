////////////////////////////////////////////////////////////////////////////////globalVariables

let appMain;// will get class instance of TaskLister
////////////////////////////////////////////////////////////////////////////////wait for DOM to load

document.addEventListener('DOMContentLoaded', () => {
  // your solution here
  // grab DOM elements
  const listDiv = document.getElementById("app-content");

  const app = new TaskLister();
  appMain = app
  // console.log(app.tasks)
  //add addEventListener
  document.getElementById("submit-create-list-form").addEventListener("click", function(event) {
     event.preventDefault();
     // console.log("SUBMIT {PRESSSED")
     getNewTaskListName()
  })

});
////////////////////////////////////////////////////////////////////////////////displayFormCreateTaskForm
//called by taskBuilder
function displayFormCreateTaskForm(formContent){
  let parent = document.querySelector('#app-content');
  parent.innerHTML = ""
  parent.innerHTML = formContent;
}//displayFormCreateTaskForm
////////////////////////////////////////////////////////////////////////////////createSelectOptionsFromTaskListKeys
function createSelectOptionsFromTaskListKeys() {  //called by taskBuilder
  //from each tasklist name create a form list option value
  console.log("createSelectOptionsFromTaskListKeys was called");
  let options = "";
  for(taskListName in appMain.tasksList){
      let option = "";
      let selected = "";
      // if (options.length == 0){selected = `selected`}
      if(appMain.lastTaskListAdded === taskListName){selected = `selected`}
      option = `<option value="${taskListName}" ${selected}>${taskListName}</option>`
      console.log(option)
      options += option
  }//for
  return options
}//createSelectOptionsFromTaskListKeys
////////////////////////////////////////////////////////////////////////////////taskBuilder
//display form for adding tasks to tasks lists.
function taskBuilder(){
  console.log("taskBuilder was called");
  //<div id="app-content"> get child node of <form id="create-task-form">
  let formCreateTaskForm=`<form id="create-task-form">
    <label for="parent-list">Select List:</label>
    <select id="parent-list">
    ${createSelectOptionsFromTaskListKeys()}
    </select>

    <label for="new-task-description">Task description:</label>
    <input required type="text" id="new-task-description" placeholder="description">

    <label for="new-task-priority">Priority level:</label>
    <input type="text" id="new-task-priority" placeholder="priority">
    <input type="submit" value="Create New Task">
  </form>`
  // createSelectOptionsFromTaskListKeys()
  displayFormCreateTaskForm(formCreateTaskForm);
}//taskBuilder

////////////////////////////////////////////////////////////////////////////////createNewTaskList
 //add variable name as key to the appMain.tasksList hash
function createNewTaskList(name){
  console.log("In createNewTaskList");
  console.log("name is:" +name);
  // console.log(appMain.tasks[0].description)
  // console.log(appMain.tasks[0])
  // this.tasks = {"thisIsATestTaskList": [{description: "someTestTask", priority: 5}] };
  appMain.tasksList[name]=[];
  appMain.lastTaskListAdded=name;
  console.log(appMain.tasksList)
  //now call on taskBuilder. no neeed to pass a variable
  taskBuilder()
}//createNewTaskList

////////////////////////////////////////////////////////////////////////////////getNewTaskListName
// function generateListEntries(){
function getNewTaskListName(){
  let newListName=document.getElementById("new-list-title").value
  document.getElementById("new-list-title").value = ""  //move this into else below
  // if empty alert user
  if(newListName.length == 0){alert("Tasklist title cannot be empty!")}
  else{
    console.log(newListName)
    createNewTaskList(newListName)//generateListEntries
  }//else
}//getNewTaskListName

////////////////////////////////////////////////////////////////////////////////class TaskLister
class TaskLister {
  // your solution here
  constructor(){
    this.test = "test";
    this.tasksList = {"thisIsATestTaskList": [{description: "someTestTask", priority: 5}] };
    this.lastTaskListAdded = "";
  }//end constructor

  render() {
    return (`<h1>Welcome to Flavortown</h1>`);
  }
}

///////////////////////////////////////////////////////////
