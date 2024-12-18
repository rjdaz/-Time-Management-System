import {categoryList} from './addCatg.js'
import * as btn from './btn.js'
import { getDataTaskList, setDataTaskList } from './main.js';
import {displayTask, } from './addtask.js'
import {resetAllDatas} from './notes.js'

let closeBtn = document.getElementById('updateCloseBtn'),
    windowUpdate = document.getElementById('editTaksWindow'),
    listCatgUpdate =document.getElementById('catgEditInfo'),
    updateTaskBtn = document.getElementById('updateEditBtn');

let taskUpdatedInfo = document.getElementById('taskEditInfo'),
    dateUpdatedInfo = document.getElementById('dateEditInfo'),
    catgUpdatedInfo = document.getElementById('catgEditInfo'),
    startUpdatedInfo = document.getElementById('startInfo'),
    endUpdatedInfo = document.getElementById('endInfo'),
    noteUpdatedInfo = document.getElementById('noteInfo');

closeBtn.addEventListener("click", () => {
  windowUpdate.style.zIndex = "0";
  btn.viewtask.style.opacity = "1";
});

function listOfcategories() {
  listCatgUpdate.innerHTML = "";

  categoryList.forEach((category) => {
    listCatgUpdate.innerHTML += `
      <option value="${category.category}">${category.category}</option>
    `
  })
}

export function openUpdateTaskWindow(taskIndex) {
  let dataTaskList = getDataTaskList();

  dataTaskList.sort((a, b) => {
    const dateDiff = new Date(a.date) - new Date(b.date);
    if (dateDiff !== 0) return dateDiff;
    const timeA = a.start.split(":").map(Number);
    const timeB = b.start.split(":").map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  });

  let taskToEdit = dataTaskList[taskIndex];

  console.log(taskToEdit)

  let windowUpdate = document.getElementById('editTaksWindow');
      windowUpdate.style.zIndex = "1";
      windowUpdate.style.opacity = "1";
      btn.viewtask.style.opacity = "0.2";

      taskUpdatedInfo.value = taskToEdit.task;
      dateUpdatedInfo.value = taskToEdit.date;
      catgUpdatedInfo.value = taskToEdit.categories;
      startUpdatedInfo.value = taskToEdit.start;
      endUpdatedInfo.value = taskToEdit.end;
      noteUpdatedInfo.value = taskToEdit.note;

  windowUpdate.dataset.editIndex = taskIndex;
}

listOfcategories();

updateTaskBtn.addEventListener("click", () => {
  let taskValue = taskUpdatedInfo.value.trim().toUpperCase(),
      dateValue = dateUpdatedInfo.value.trim().toUpperCase(),
      catgValue = catgUpdatedInfo.value.trim().toUpperCase(),
      startValue = startUpdatedInfo.value,
      endValue = endUpdatedInfo.value,
      noteValue = noteUpdatedInfo.value.trim().toUpperCase();

  let dataTaskList = getDataTaskList();

    if (!taskValue || !dateValue || !catgValue || !startValue || !endValue || !noteValue) {
      alert("All fields are required!");
      return;
    }

    let taskIndex = parseInt(windowUpdate.dataset.editIndex);

    dataTaskList.sort((a, b) => {
      const dateDiff = new Date(a.date) - new Date(b.date);
      if (dateDiff !== 0) return dateDiff;
      const timeA = a.start.split(":").map(Number);
      const timeB = b.start.split(":").map(Number);
      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });

    if (taskIndex >= 0) {
      dataTaskList.splice(taskIndex, 1);
    }

    dataTaskList.push({
      task: taskValue,
      categories: catgValue,
      date: dateValue,
      start: startValue,
      end: endValue,
      note: noteValue
    });

    setDataTaskList(dataTaskList);

    windowUpdate.style.zIndex = "0";
    windowUpdate.style.opacity = "0";
    btn.viewtask.style.opacity = "1";

    displayTask();
    resetAllDatas();
});

