import {deleteTask} from "./addtask.js";
import { getDataTaskList, setDataTaskList, getDataDoneTaskList, setDataDonetask } from './main.js';
import {deleteCategory} from './addCatg.js';

let dataNotesInfo = document.querySelector('.dataNotes');
let taskNotes = document.getElementById('notesDataTask'),
    taskDateInfo = document.getElementById('notesDateTask'),
    taskStartTimesInfo = document.getElementById('notesDataStime'),
    taskEndTimeInfo = document.getElementById('notesDataEtime'),
    taskNotesInfo = document.getElementById('noteDataInfoTask'),
    rmainingTimeInfo = document.getElementById('timeCd')
let accomplish = "accomplished";
let notAccomplish = "not-accomplished";

let viewLocation = document.getElementById('viewLists').addEventListener("click", (event) => {
  let dataTaskList = getDataTaskList();
  let doneDataTaskList = getDataDoneTaskList();
  const clickedTask = event.target.closest('.task');

  if (clickedTask) {
    const taskIndex = clickedTask.getAttribute("data-index");
    const taskName = clickedTask.querySelector("p:nth-child(2)").textContent.trim();
    const taskDate = clickedTask.querySelector("p:nth-child(3)").textContent.trim();
    const taskTime = clickedTask.querySelector("p:nth-child(4)").textContent.trim();

    console.log(taskIndex)

    let NameValue = taskName.replace("Task: ", "").trim();
    let DateValue = taskDate.replace("Date: ", "").trim();
    let TimeValue = taskTime.replace("Time: ", "").trim();

    let matchchecking = dataTaskList.some(datacheck => 
      datacheck.task.trim().toUpperCase() === NameValue.toUpperCase() && 
      datacheck.date.trim().toUpperCase() === DateValue.toUpperCase() &&
      datacheck.start.trim().toUpperCase() === TimeValue.toUpperCase()
    );

    let currentdate = getCurrentDate();

    let taskNames = dataTaskList.find(task => task.task.toUpperCase() === NameValue.toUpperCase());

    let endTimes = taskNames.end;
    let infoNotes = taskNames.note;
    let startValue = getMilitaryTime();
    let endValue = endTimes;
    let differenceTime = calculateTimeDifference(startValue, endValue);

//change of bgcolors

    console.log(startValue);
    console.log(currentdate);

      if(matchchecking) {
        taskNotes.innerHTML = `Task : ${NameValue}`;
        taskDateInfo.innerHTML = `Date : ${DateValue}`;
        taskStartTimesInfo.innerHTML = `Start Time : ${TimeValue}`
        taskEndTimeInfo.innerHTML = `End Time : ${endTimes}`
        taskNotesInfo.innerHTML = infoNotes;
        rmainingTimeInfo.innerHTML = differenceTime;
      }

      let timerInterval;
      let remainingTime;

      function convertToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    remainingTime = convertToSeconds(differenceTime);

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
      const timerElement = document.getElementById('timeCd');
      timerElement.textContent = formatTime(remainingTime);
  }

  function startTimer() {
    if(DateValue >= currentdate && startValue <= endValue) {
      if (timerInterval) return;
      timerInterval = setInterval(() => {
          if (remainingTime > 0) {
              remainingTime--;
              updateTimerDisplay();
          } else {
              clearInterval(timerInterval);
              timerInterval = null;
          }
      }, 60000);
    }else {
      let nameValue = document.getElementById('notesDataTask').textContent,
        dateTask = document.getElementById('notesDateTask').textContent,
        startTask = document.getElementById('notesDataStime').textContent,
        endTask = document.getElementById('notesDataEtime').textContent,
        reaminingTime = document.getElementById('timeCd').textContent,
        noteTask = document.getElementById('noteDataInfoTask').textContent

      let name = nameValue.replace("Task : ","").trim();
      let date = dateTask.replace("Date : ","").trim();
      let sTime = startTask.replace("Start Time :","").trim();
      let Etime = endTask.replace("End Time : ","").trim();
      let rTime = reaminingTime.trim();
      let notes = noteTask.trim();

      doneDataTaskList.push({
        task: name,
        date: date,
        start: sTime,
        end: Etime,
        remaining: rTime,
        note: notes,
        status: notAccomplish
      })

      setDataDonetask(doneDataTaskList);
    }   
}

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function doneTasks() {
    let nameValue = document.getElementById('notesDataTask').textContent,
        dateTask = document.getElementById('notesDateTask').textContent,
        startTask = document.getElementById('notesDataStime').textContent,
        endTask = document.getElementById('notesDataEtime').textContent,
        reaminingTime = document.getElementById('timeCd').textContent,
        noteTask = document.getElementById('noteDataInfoTask').textContent

    let name = nameValue.replace("Task : ","").trim();
    let date = dateTask.replace("Date : ","").trim();
    let sTime = startTask.replace("Start Time :","").trim();
    let Etime = endTask.replace("End Time : ","").trim();
    let rTime = reaminingTime.trim();
    let notes = noteTask.trim();

    console.log(name);
    console.log(date);
    console.log(sTime);
    console.log(Etime);
    console.log(rTime);
    console.log(notes);

    doneDataTaskList.push({
      task: name,
      date: date,
      start: sTime,
      end: Etime,
      remaining: rTime,
      note: notes,
      status: accomplish
    })

    setDataDonetask(doneDataTaskList);

    deleteTask(taskIndex);
    console.log(doneDataTaskList)
  }

  document.getElementById('btnstrtTime').addEventListener('click', startTimer);
  document.getElementById('btnendTime').addEventListener('click', pauseTimer);
  document.getElementById('btnDone').addEventListener('click', doneTasks);

  console.log(doneDataTaskList)

  }
})

//military time
export function getMilitaryTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

//current date
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

//calc start and end time
function calculateTimeDifference(startTime, endTime) {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;
  
  let diffMinutes = endTotalMinutes - startTotalMinutes;
  
  if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;

  const formattedTime = `${String(diffHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
    return formattedTime;
}

//clear the data in notes
export function resetAllDatas () {
  taskNotes.innerHTML = `Task : `;
  taskDateInfo.innerHTML = `Date : `;
  taskStartTimesInfo.innerHTML = `Start Time : `
  taskEndTimeInfo.innerHTML = `End Time : `
  taskNotesInfo.innerHTML = "";
  rmainingTimeInfo.innerHTML = `00:00`;
}

//auto remove and move to done data
export function autoMoveData () {
  let dataTaskList  = getDataTaskList();
  let doneDataTaskList = getDataDoneTaskList();
  let currentTIme = getMilitaryTime();
  let currentdate = getCurrentDate();

    dataTaskList.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (dataTaskList .length > 0) {
      let firstTask = dataTaskList [0];
      let dateFirstIndex = dataTaskList[0].date;
      if(dateFirstIndex === currentdate){
        if (currentTIme > firstTask.end) {
          let nameValue = firstTask.task;
          let dateTask = firstTask.date;
          let startTask = firstTask.start;
          let endTask = firstTask.end;
          let remainingTime = firstTask.remaining;
          let noteTask = firstTask.note;
    
        doneDataTaskList.push({
          task: nameValue,
            date: dateTask,
            start: startTask,
            end: endTask,
            remaining: remainingTime,
            note: noteTask,
            status: notAccomplish
        })
    
          dataTaskList.shift();
          deleteTask(0);
    
          setDataTaskList(dataTaskList);
          setDataDonetask(doneDataTaskList);
        }
      }else {
        return;
      }
    }
}

function autoStartTaskChecker() {
  console.log("Auto Task Checker Started...");

  setInterval(() => {
    autoMoveData();
  }, 1000);
}

autoStartTaskChecker();
