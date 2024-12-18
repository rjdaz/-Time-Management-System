import * as calendar from "./calendar.js";
import * as btn from "./btn.js";
import * as addTask from "./addtask.js";
import * as addCatg from "./addCatg.js";
import * as daily from "./daily.js";
import * as view from "./view.js";
import * as notes from "./notes.js";
import * as update from "./update.js"

const STORAGE_KEY = 'taskStorage';

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  console.log('Initialized taskStorage with an empty array.');
}

// Getter for dataTaskList
export function getDataTaskList() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

// Setter for dataTaskList
export function setDataTaskList(newDataTaskList) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDataTaskList));
    window.dispatchEvent(new Event('dataTaskListUpdated'));
    console.log('Updated taskStorage:', newDataTaskList);
  } catch (e) {
  }
}

// Listener for changes in localStorage
window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY) {
    window.dispatchEvent(new Event('dataTaskListUpdated'));
  }
});

// done storage

const DONE_STORAGE = 'doneStorage';

export function getDataDoneTaskList () {
  try {
    const data = JSON.parse(localStorage.getItem(DONE_STORAGE));
    return Array.isArray(data) ? data : [];
  }catch (e) {
    return [];
  }
}

export function setDataDonetask(newDataDoneTask) {
  try{
    localStorage.setItem(DONE_STORAGE, JSON.stringify(newDataDoneTask));
    window.dispatchEvent(new Event('dataTaskListDoneUpdated'));
  } catch (e) {

  }
}

window.addEventListener('storage', (event) => {
  if (event.key === DONE_STORAGE) {
    window.dispatchEvent(new Event('dataTaskListDoneUpdated'))
  }
});

export function clearAllDoneData() {
  localStorage.removeItem(DONE_STORAGE);
}

function realtime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  console.log(`${hours}:${minutes}:${seconds}`);
}

//clearAllDoneData();
realtime();
notes.autoMoveData();
