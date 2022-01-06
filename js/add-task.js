"use strict";

var title = document.getElementById("title");
var send = document.getElementById("send");
var date = document.getElementById("term");
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

today = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min;
document.getElementById("term").setAttribute("min", today);
document.getElementById("term").setAttribute("value", today);

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
taskForm.addEventListener('submit', addValues);
  
function addValues(event) {
  event.preventDefault();
  let task = {
    title: title.value,
    description: desc.value,
    date: date.value
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  let getTasks = localStorage.getItem("tasks");
  getTasks = JSON.parse(getTasks);

  this.reset();

  console.log(tasks);
  document.getElementById("success").innerText = "Задача успешно добавлена";
}