import * as btn from "./btn.js";
import { getDataTaskList, getDataDoneTaskList } from './main.js';

let dateElement = document.getElementById('chooseDate'),
    listDailyTask = document.getElementById('listDailys'),
    exitbtnDaily = document.getElementById('exitbtndaily')

dateElement.addEventListener('change', showList);

window.onload = showList;

exitbtnDaily.addEventListener("click", () => {
  btn.windowDailyTask.style.opacity = "0";
  btn.windowDailyTask.style.zIndex = "0";
  btn.viewtask.style.opacity = "1";
  btn.viewtask.style.zIndex = "1";
  btn.btndailyTask.style.backgroundColor = "#F0ECE5";
  btn.btndailyTask.style.color = "#31304D";
  dateElement.value = "";
  listDailyTask.innerHTML = "";
})

function showList () {
  let dateInput = dateElement.value;
  let dataDoneTaskList = getDataDoneTaskList();
  listDailyTask.innerHTML = "";

  dataDoneTaskList.sort((a, b) => {
    return a.start.localeCompare(b.start);
  });

  dataDoneTaskList.forEach((data) => {
    if(dateInput === data.date){
      listDailyTask.innerHTML += `
      <div class="dailyActivity" data-status="${data.status}">
        <div class="nameTaskAndTime">
          <div>
            <p>Task: ${data.task}</p>
          </div>
          <div>
            <p>Time: ${data.start} - ${data.end}</p>
          </div>
        </div>
        
        <div>
          <p>Date: ${data.date}</p>
        </div>
      </div>
      `
    }
  })

  console.log(dataDoneTaskList)
}

showList();

