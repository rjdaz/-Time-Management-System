import * as btn from "./btn.js";
import { getDataTaskList, setDataTaskList } from './main.js';
import {categoryList} from './addCatg.js'
import { resetAllDatas, getMilitaryTime, getCurrentDate } from './notes.js'
import {openUpdateTaskWindow} from "./update.js"

let closeWindow = document.querySelector('.closeWindow');
let inputElementTask = document.getElementById('doTask');
let categoriesTask = document.getElementById('ctgryies');
let inputDate = document.getElementById('dateTask');
let inputStrtTime = document.getElementById('startTask');
let inputEndTime = document.getElementById('endTask');
let inputNote = document.getElementById('notesTask');
let tasklistData = document.getElementById('viewLists');
let listOfcategory = document.getElementById('ctgryies');
let btnClear = document.getElementById('clearBtn');
let btnSave = document.getElementById('saveBtn');
let currentDate = getCurrentDate();
let currentTime = getMilitaryTime();

console.log(currentDate)
console.log(currentTime)

// Display tasks on page load
window.onload = displayTask;

function listOfcategories() {
  listOfcategory.innerHTML = "";

  categoryList.forEach((category) => {
    listOfcategory.innerHTML += `
      <option value="${category.category}">${category.category}</option>
    `
  })

  console.log(categoryList);
}

window.addEventListener('categoryListUpdated', listOfcategories);

listOfcategories();

// Close the task input window
  closeWindow.addEventListener("click", () => {
    btn.windowAddTask.style.opacity = "0";
    btn.windowAddTask.style.zIndex = "0";
    btn.viewtask.style.opacity = "1";
    btn.viewtask.style.zIndex = "1";
    btn.tasks.style.backgroundColor = "#F0ECE5";
    btn.tasks.style.color = "#31304D";
  });

// Save a new task when the save button is clicked
  btnSave.addEventListener("click", () => {
    let inputTextTask = inputElementTask.value.trim().toUpperCase();
    let inputCategory = categoriesTask.value.trim().toUpperCase();
    let inputDateTask = inputDate.value.trim();
    let inputStrtTask = inputStrtTime.value;
    let inputEndTask = inputEndTime.value;
    let inputNoteTask = inputNote.value.trim();

    let dataTaskList = getDataTaskList();

  // Validate all input fields
    if (!inputTextTask || !inputCategory || !inputDateTask || !inputStrtTask || !inputEndTask || !inputNoteTask) {
      alert("All fields are required!");
      return;
    }

    if(inputDateTask >= currentDate ) {
      if(inputDateTask > currentDate) {
        dataTaskList.push({
          task: inputTextTask,
          categories: inputCategory,
          date: inputDateTask,
          start: inputStrtTask,
          end: inputEndTask,
          note: inputNoteTask
        });
      }else if(inputStrtTask >= currentTime && currentTime <= inputEndTask) {
        dataTaskList.push({
          task: inputTextTask,
          categories: inputCategory,
          date: inputDateTask,  
          start: inputStrtTask,
          end: inputEndTask,
          note: inputNoteTask
        });
      }else {
        alert('Incorrect input Time!!');
        clearAll();
        return;
      }
    }else {
      alert('Incorrect input Date!!');
      clearAll();
      return;
    }

    setDataTaskList(dataTaskList);

    console.log(dataTaskList)

    displayTask();
    clearAll();

  });

// Clear input fields
btnClear.addEventListener("click", () => {
  clearAll();
});

// Clear all input fields
function clearAll() {
  inputElementTask.value = "";
  categoriesTask.value = "";
  inputDate.value = "";
  inputStrtTime.value = "";
  inputEndTime.value = "";
  inputNote.value = "";
}

// Display tasks from the dataTaskList
export function displayTask() {
  let dataTaskList = getDataTaskList();
    tasklistData.innerHTML = "";

    dataTaskList.sort((a, b) => {
      const dateDiff = new Date(a.date) - new Date(b.date);
      if (dateDiff !== 0) return dateDiff;
      const timeA = a.start.split(":").map(Number);
      const timeB = b.start.split(":").map(Number);
      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });

    dataTaskList.forEach((data, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      taskDiv.id = `taskInfo-${index}`;
      taskDiv.setAttribute("data-index", index);
      
        if (index === 0) {
          taskDiv.style.backgroundColor = "#468ec2";
          taskDiv.style.color = "white";
        }
      
      const edittask = document.createElement("button");
      edittask.className = "editBtn";
      edittask.innerHTML = `
      <i class="fa fa-edit" style="font-size:24px; color:green"></i>
      `;
//btn for edit the task
      edittask.addEventListener("click", () => openUpdateTaskWindow(index));
      taskDiv.appendChild(edittask);

      const taskText = document.createElement("p");
      taskText.textContent = `Task: ${data.task}`;
      taskDiv.appendChild(taskText);

      const dateText = document.createElement("p");
      dateText.textContent = `Date: ${data.date}`;
      taskDiv.appendChild(dateText);

      const tasktime = document.createElement("p");
      tasktime.textContent = `Time: ${data.start}`;
      taskDiv.appendChild(tasktime);

      const deleteButton = document.createElement("button");
      deleteButton.className = "deletetask";
      deleteButton.innerHTML = `<span style="font-size:17px;">&#10060;</span>`;
      deleteButton.addEventListener("click", () => deleteTask(index));

      taskDiv.appendChild(deleteButton);
      tasklistData.appendChild(taskDiv);
    });
  }

//Delete a task by index
export function deleteTask(index) {
  let dataTaskList = getDataTaskList();

  dataTaskList.sort((a, b) => {
    const dateDiff = new Date(a.date) - new Date(b.date);
    if (dateDiff !== 0) return dateDiff;
    const timeA = a.start.split(":").map(Number);
    const timeB = b.start.split(":").map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  });

    dataTaskList.splice(index, 1); 

    localStorage.setItem('taskStorage', JSON.stringify(dataTaskList));


  displayTask();
  resetAllDatas();
}


