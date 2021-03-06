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
  // document.getElementById("submit-create-list-form").addEventListener("click", function(event) {
  //    event.preventDefault();
  //    // console.log("SUBMIT {PRESSSED")
  //    getNewTaskListName()
  // })
  let e=document.getElementById("create-list-form")
  // .submit(function(event) {
  //    event.preventDefault();
  //    // console.log("SUBMIT {PRESSSED")
  //    // getNewTaskListName()
  // })
  e.addEventListener("submit", function(event) {event.preventDefault(); getNewTaskListName()}, false)
});
////////////////////////////////////////////////////////////////////////////////deleteList
//called by addEventListenerToList
function deleteList(listName) {
  // console.log("Inside deleteList, called by " + listName);
  //find list in appMain, delete key value pair
  // console.log(appMain.tasksList[listName]);
  delete appMain.tasksList[listName]
  // console.log("post delete");
  // console.log(appMain.tasksList);
  // console.log("DID YOU FIX : when there are no lists, create task form should be removed");
  //redraw screen
  taskBuilder()
}//addEventListener
////////////////////////////////////////////////////////////////////////////////addEventListenerToList
//called by taskBuilder
function addEventListenerToList() {
    lists = Array.from(document.querySelectorAll('.delete-list'));
    // console.log("inside addEventListenerToList");
    // console.log(lists);

    for(const list of lists){
      // console.log(list);
      // console.log(list.dataset);
      // console.log(list.dataset.title);  //list name
      let listName = list.dataset.title
      // list.addEventListener("click",()=>console.log("CLICK WORKS" + list.dataset.title))
      // list.addEventListener("click",()=>console.log("CLICK WORKS" + listName))
      list.addEventListener("click",()=>(deleteList(listName) ))
    }//for
}//addEventListenerToList

////////////////////////////////////////////////////////////////////////////////deleteTask
//called by addEventListenerToTask
function deleteTask(list,description) {
  // console.log("Inside deleteTask");
  // console.log(list + " " + description);
  //delete task
  // for
  // console.log(appMain.tasksList[`${list}`]);
  let listArray=appMain.tasksList[`${list}`]
  let descriptionIndex= null;
  listArray.forEach((element,index,array)=>{
    // console.log("element:");
    // console.log(element);
    if(element["description"]==description){
      descriptionIndex = index
    }//if
  })//forEach
  // console.log("index is " +descriptionIndex);
  //slice around descriptionIndex
  if(descriptionIndex != null) {listArray.splice(descriptionIndex,1)}
  //call taskBuilder to refesh page
  taskBuilder()
}
////////////////////////////////////////////////////////////////////////////////addEventListenerToTask
//called by taskBuilder
function addEventListenerToTask() {
  //create array from nodelist
  tasks = Array.from(document.querySelectorAll('.delete-task'));
  // console.log("IN addEventListener");
  for(const task of tasks){
    // console.log(tasks);
    // console.log(task);
    // console.log(task.dataset);
    // console.log(task.dataset.listTitle);  //list name
    // console.log(task.dataset.taskName);   //task description
    let list = task.dataset.listTitle
    let description = task.dataset.taskName
    // console.log(tasks[0]["data-list-title"].value);
    // console.log(tasks[0]["data-task-name"].value);
    // task.addEventListener("click",()=>console.log("CLICK WORKS" + task.dataset.listTitle))
    task.addEventListener("click",()=>(deleteTask(list,description) ))
  }//for
}//addEventListenerToTask
////////////////////////////////////////////////////////////////////////////////addListContent
//called by getNewTask
function addListContent(description,priority,listName){
  // let newTask = {`${description}`: `${priority}`}
  let newTask = {"description": [description], "priority": priority}
  // console.log(newTask);
  appMain.tasksList[listName].push(newTask)
}
////////////////////////////////////////////////////////////////////////////////getNewTask
//called by addEventListenerForCreateTaskForm
function getNewTask() {
  //get value from form
    // var e = document.getElementById("ddlViewBy");
    // var strUser = e.options[e.selectedIndex].text;
  let listNameElement=document.querySelector('#parent-list')
  let listName = listNameElement.options[listNameElement.selectedIndex].text
  let description=document.querySelector('#new-task-description').value
  let priority=document.querySelector('#new-task-priority').value
  // console.log(description);
  // console.log(priority);
  //if no value in priority, make it "low"
  if (priority.length == 0 ){priority = "low"}
  // update tasklist
    addListContent(description,priority,listName)
  //update display
  // displayLists()
  taskBuilder()
}
////////////////////////////////////////////////////////////////////////////////addEventListenerForCreateTaskForm
//called by taskBuilder
function addEventListenerForCreateTaskForm() {
  submitButton = document.getElementById("submit-create-task-form")
  if(submitButton){
    submitButton.addEventListener("click", function(event) {
       event.preventDefault();
       // console.log("SUBMIT {PRESSSED")
       getNewTask()
    })
  }
}//addEventListenerForCreateTaskForm
////////////////////////////////////////////////////////////////////////////////makeDivOfAllLists
//called by displayLists
function makeDivOfAllLists(){
  let divOfLists = `<div id="lists">`
  for( list in appMain.tasksList){
    // console.log("do we even get here?");
    let divContent = `<div><h2>${list}<button data-title="${list}" class="delete-list">X</button></h2><ul>`
    for( task of appMain.tasksList[list]){
      // console.log("task is:" +task)
      // console.log(task)
      // console.log(task["description"])
      if(task){
        let taskContent = `<li>"Task:${task['description']}"`
        taskContent += `<button data-list-title="${list}" data-task-name="${task['description']}" class="delete-task">X</button>`
        taskContent += `<br>"Priority:${task['priority']}"</li>`
        divContent += taskContent
      }
    } //task
    divContent += `</ul></div>`
    divOfLists += divContent
  }//for list
  divOfLists +=`</div>`
  return divOfLists
}//makeDivOfAllLists
////////////////////////////////////////////////////////////////////////////////displayLists
//called by taskBuilder
function displayLists(){
  //get each list and its task description and priority
  //create div with id="lists"
  //inner children should be the lists
  let divOfLists = makeDivOfAllLists()
  //place div in div app-content  under form
  content = document.querySelector('#app-content').innerHTML
  content+= divOfLists
  document.querySelector('#app-content').innerHTML = content
  //now add addEventListener to each button created*****************************************************
}
////////////////////////////////////////////////////////////////////////////////displayFormCreateTaskForm
//called by taskBuilder
function displayFormCreateTaskForm(formContent){
  let parent = document.querySelector('#app-content');
  parent.innerHTML = ""
  if(Object.keys(appMain.tasksList).length > 0 ){
    parent.innerHTML = formContent;
  }
}//displayFormCreateTaskForm
////////////////////////////////////////////////////////////////////////////////createSelectOptionsFromTaskListKeys
function createSelectOptionsFromTaskListKeys() {  //called by taskBuilder
  //from each tasklist name create a form list option value
  // console.log("createSelectOptionsFromTaskListKeys was called");
  let options = "";
  for(taskListName in appMain.tasksList){
      let option = "";
      let selected = "";
      // if (options.length == 0){selected = `selected`}
      if(appMain.lastTaskListAdded === taskListName){selected = `selected`}
      option = `<option value="${taskListName}" ${selected}>${taskListName}</option>`
      // console.log(option)
      options += option
  }//for
  return options
}//createSelectOptionsFromTaskListKeys
////////////////////////////////////////////////////////////////////////////////taskBuilder
//called by createNewTaskList
//also called by getNewTask
//also called by deleteTask
//also called by deleteList
function taskBuilder(){ //display form for adding tasks to tasks lists.
  // console.log("taskBuilder was called");
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
    <input type="submit" value="Create New Task" id="submit-create-task-form">
  </form>`
  // createSelectOptionsFromTaskListKeys()
  //*********************** add if statement here , if no lists dont run displayFormCreateTaskForm************
  // if(Object.keys(appMain.tasksList).length > 0 ){    //when I added this the last item would not remove
    displayFormCreateTaskForm(formCreateTaskForm);
  // }
  displayLists()
  //get input from "create-task-form" submission, add to list, display
    //add addEventListener? preventDefault to submit button
    addEventListenerForCreateTaskForm()
    addEventListenerToList()
  //add addEventListener to each task
    addEventListenerToTask()
}//taskBuilder

////////////////////////////////////////////////////////////////////////////////createNewTaskList
 //add variable name as key to the appMain.tasksList hash
function createNewTaskList(name){
  // console.log("In createNewTaskList");
  // console.log("name is:" +name);
  // console.log(appMain.tasks[0].description)
  // console.log(appMain.tasks[0])
  // this.tasks = {"thisIsATestTaskList": [{description: "someTestTask", priority: 5}] };
  appMain.tasksList[name]=[];
  appMain.lastTaskListAdded=name;
  // console.log(appMain.tasksList)
  //now call on taskBuilder. no neeed to pass a variable
  taskBuilder()
}//createNewTaskList

////////////////////////////////////////////////////////////////////////////////getNewTaskListName
// function generateListEntries(){
function getNewTaskListName(){
  let newListName=document.getElementById("new-list-title").value
  document.getElementById("new-list-title").value = ""  //move this into else below
  // if empty alert user
  if(newListName.length == 0){
    // alert("Tasklist title cannot be empty!")
    alert(document.getElementById('new-list-title').validationMessage);
  }
  else{
    // console.log(newListName)
    createNewTaskList(newListName)//generateListEntries
  }//else
}//getNewTaskListName

////////////////////////////////////////////////////////////////////////////////class TaskLister
class TaskLister {
  // your solution here
  constructor(){
    this.test = "test";
    // this.tasksList = {"thisIsATestTaskList": [{description: "someTestTask", priority: "5"}] }; //test data remove after
    this.tasksList = {};
    this.lastTaskListAdded = "";  //if referenced list removed, some function assign  first task to this *********
  }//end constructor

  render() {
    return (`<h1>Welcome to Flavortown</h1>`);
  }
}

///////////////////////////////////////////////////////////
