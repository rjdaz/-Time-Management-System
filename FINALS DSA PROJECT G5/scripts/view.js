import { getDataTaskList, setDataTaskList } from './main.js';
import { resetAllDatas, getMilitaryTime, getCurrentDate } from './notes.js'
import {displayTask, deleteTask} from './addtask.js'
import {openUpdateTaskWindow} from "./update.js"

let inputElement = document.getElementById('searchbtn'),
    tasklistData = document.getElementById('viewLists');

inputElement.addEventListener("input", e => {
  let value = e.target.value.toUpperCase();
  tasklistData.innerHTML = ""
  let datalist = getDataTaskList();

    if(value === ""){
      displayTask();
    }else{
      const matchingData = datalist.filter(task => task.task.toUpperCase().includes(value));

      matchingData.forEach((data, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.id = `taskInfo-${index}`;
        taskDiv.setAttribute("data-index", index);
        
        const edittask = document.createElement("button");
        edittask.className = "editBtn";
        edittask.innerHTML = `
        <i class="fa fa-edit" style="font-size:24px; color:green"></i>
        `;
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
        })
    }

    

  console.log(value)
})
