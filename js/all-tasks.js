"use strict";

let tasksFromStorage = localStorage.getItem("tasks");
tasksFromStorage = JSON.parse(tasksFromStorage);
console.log(tasksFromStorage);

let taskSection = document.querySelector(".task-list");
let h1 = document.createElement("h1");
h1.innerText = "список задач";

let zeroListMessage = document.createElement("span");
zeroListMessage.classList.add("message");

taskSection.append(h1, zeroListMessage);

let deleteButton = document.createElement("button");
deleteButton.classList.add("show");
deleteButton.innerText = "Удалить выбранные";

let pressElem = [];

function addTasks(tasksArr, element) {
  for (let task of tasksArr) {
    let cardTask = document.createElement("div");
    cardTask.classList.add("card-task");

    let titleTask = document.createElement("h3");
    titleTask.classList.add("title-task");
    titleTask.innerText = task.title;

    let descTask= document.createElement("span");
    descTask.classList.add("desc-task");
    descTask.innerText = task.description;

    let timeTask = document.createElement("p");
    timeTask.classList.add("time-task");
    timeTask.innerText = `Выполнить к: ${task.date.substr(0, 10).split("-").reverse().join("-").replaceAll("-", ".")}`;

    cardTask.append(titleTask, descTask, timeTask);
    taskSection.append(cardTask);
  }
  taskSection.append(deleteButton);
}

// addTasks(tasksFromStorage, taskSection);

function zeroTasks() {
  if (tasksFromStorage === null || tasksFromStorage.length === 0) {
    deleteButton.className = "hide";
    zeroListMessage.innerText = "у вас нет задач"
  } else {
    deleteButton.className = "show";
  }
}

//zeroTasks();

function tasksList() {
  if (tasksFromStorage) {
    addTasks(tasksFromStorage, taskSection);
    // return;
  } else zeroTasks();
}
  
tasksList();

function markTask() {
  for (let task of document.querySelectorAll(".card-task")) {
    task.addEventListener('click', function(){
      task.classList.toggle("mark");
      if (task.classList.contains("mark")) {
        pressElem.push(task);
      } else {
        pressElem.splice(pressElem.indexOf(task, 0), 1);
      }
      console.log(pressElem);
    });
  }
}

markTask();

function clickDeleteTask() {
  deleteButton.addEventListener('click', deleteTask);
  // let newTasks = document.querySelectorAll(".card-task");
  // localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function deleteTask() {
  let markTasks = document.querySelectorAll(".mark");
  if (markTasks.length) {
    markTasks.forEach((task) => {
      task.remove();
    });
    let newTasks = document.querySelectorAll(".card-task");
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
}

clickDeleteTask();