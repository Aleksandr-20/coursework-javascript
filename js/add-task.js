"use strict";

var title = document.getElementById("title");
var send = document.getElementById("send");
var desc = document.getElementById("description");

title.addEventListener('blur', function (event) {
  if (title.validity.valueMissing || title.validity.rangeOverflow) {
    title.setCustomValidity("Значение должно быть в диапазоне от 1 до 20 символов");
  } else {
    title.setCustomValidity("");
  }
});

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();

if (dd < 10) {
  dd='0' + dd
} 
if (mm < 10) {
  mm='0' + mm
}
if (hh < 10) {
  hh='0' + hh
}
if (min < 10) {
  min='0' + min
}

today = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min;

document.getElementById("term").setAttribute("min", today);
document.getElementById("term").setAttribute("value", today);

let date = document.getElementById("term");

date.addEventListener('blur', function (event) {
    if (date.validity.rangeUnderflow) {
        date.setCustomValidity("Дата не должна быть в прошлом");
    } else {
        date.setCustomValidity("");
    }
  });
  
// var tasks = [];
var data = localStorage.getItem("tasks");
var tasks = data ? JSON.parse(data) : [];

let taskForm = document.getElementsByName("add-task")[0];
var id = 0; // счетчик id
taskForm.addEventListener('submit', addValues);
  
function addValues(event) {
  event.preventDefault();
  let task = {
    title: title.value,
    description: desc.value,
    date: date.value,
    id: ++id + title.value
  };

  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("success").innerText = "Задача успешно добавлена";
  document.getElementById("success").classList.add("visible");

  this.reset();

  setTimeout(() => {document.getElementById("success").classList.remove("visible")}, 2000);
  console.log(tasks);
}