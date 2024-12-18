import * as addtask from "./addtask.js";

//btn
export let tasks = document.getElementById('addTask');
export let btnviewTasks = document.getElementById('viewTask');
export let btndailyTask = document.getElementById('dailyTask');
export let btnAddCtgry = document.getElementById('addCtgry');

//window
export let viewtask = document.querySelector('.viewList');
export let windowAddTask = document.getElementById('windowForAddTasks');
export let windowDailyTask = document.getElementById('windowDailyTasks');
export let windowAddCtgry = document.getElementById('windowAddCtgy');
export let windowUpdate = document.getElementById('editTaksWindow');

tasks.addEventListener("click", () => {
  windowAddTask.style.opacity = "1";
  windowAddTask.style.zIndex = "1";
  viewtask.style.opacity = "0.2";
  viewtask.style.zIndex = "0";
  windowDailyTask.style.opacity = "0";
  windowDailyTask.style.zIndex = "0";
  windowAddCtgry.style.opacity = "0";
  windowAddCtgry.style.zIndex = "0";
  windowUpdate.style.zIndex = "0";
})

btnviewTasks.addEventListener("click", () => {
  windowAddTask.style.opacity = "0";
  windowAddTask.style.zIndex = "0";
  viewtask.style.opacity = "1";
  viewtask.style.zIndex = "1";
  windowDailyTask.style.opacity = "0";
  windowDailyTask.style.zIndex = "0";
  windowAddCtgry.style.opacity = "0";
  windowAddCtgry.style.zIndex = "0";
  windowUpdate.style.zIndex = "0";
  windowUpdate.style.opacity = "0";
  addtask.displayTask();
})

btndailyTask.addEventListener("click", () => {
  windowAddTask.style.opacity = "0";
  windowAddTask.style.zIndex = "0";
  viewtask.style.opacity = "0.2";
  viewtask.style.zIndex = "0";
  windowDailyTask.style.opacity = "1";
  windowDailyTask.style.zIndex = "1";
  windowAddCtgry.style.opacity = "0";
  windowAddCtgry.style.zIndex = "0";
  windowUpdate.style.zIndex = "0";
  windowUpdate.style.opacity = "0";
})

btnAddCtgry.addEventListener("click", () => {
  windowAddTask.style.opacity = "0";
  windowAddTask.style.zIndex = "0";
  viewtask.style.opacity = "0.2";
  viewtask.style.zIndex = "0";
  windowDailyTask.style.opacity = "0";
  windowDailyTask.style.zIndex = "0";
  windowAddCtgry.style.opacity = "1";
  windowAddCtgry.style.zIndex = "1";
  windowUpdate.style.zIndex = "0";
  windowUpdate.style.opacity = "0";
})

//hover btn
const buttons = document.querySelectorAll('.btnListAdd, .btnListView, .btnListDaily, .btnListCgtry');

let activeButton = null;

buttons.forEach((button) => {
  button.addEventListener("mouseover", (e) => {
    if (e.currentTarget !== activeButton) {
      e.currentTarget.style.backgroundColor = "#31304D";
      e.currentTarget.style.color = "#F0ECE5";
    }
  });

  button.addEventListener("mouseout", (e) => {
    if (e.currentTarget !== activeButton) {
      e.currentTarget.style.backgroundColor = "#F0ECE5";
      e.currentTarget.style.color = "#31304D"; 
    }
  });

  button.addEventListener("click", (e) => {
    if (activeButton) {
      activeButton.style.backgroundColor = "#F0ECE5";
      activeButton.style.color = "#31304D";
    }
    activeButton = e.currentTarget;
    activeButton.style.backgroundColor = "#31304D";
    activeButton.style.color = "#F0ECE5";
  });
});

