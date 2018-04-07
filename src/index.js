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
////////////////////////////////////////////////////////////////////////////////createNewTaskList
 //add variable name as key to the appMain.tasksList hash
function createNewTaskList(name){
  console.log("In createNewTaskList");
  console.log("name is:" +name);
  // console.log(appMain.tasks[0].description)
  // console.log(appMain.tasks[0])
  // this.tasks = {"thisIsATestTaskList": [{description: "someTestTask", priority: 5}] };
  appMain.tasksList[name]=[];
  console.log(appMain.tasksList)
  //now call on taskBuilder. no neeed to pass a variable
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
  }//end constructor

  render() {
    return (`<h1>Welcome to Flavortown</h1>`);
  }
}

///////////////////////////////////////////////////////////
