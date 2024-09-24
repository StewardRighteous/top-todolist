// creates a task container with checkbox, task name, description, time , edit , star, delete options
import { TaskObserver } from "../../manager/barrel.js";
import trashIcon from "../../../img/trash-2.svg";
import starIcon from "../../../img/star.svg";
import starredIcon from "../../../img/starred.svg";
import editIcon from "../../../img/edit.svg";
export default function createTaskContainer(task, taskListContainer){
    const taskContainer = document.createElement("div");
    taskContainer.className = "task";

    const completedCheckboxInput = document.createElement("input");
    completedCheckboxInput.type = "checkbox";

    const taskAndDateContainer = document.createElement("div");
    taskAndDateContainer.className = "task-name-desc-date"

    const taskName = document.createElement("h1");
    taskName.textContent = task.title;
    taskAndDateContainer.appendChild(taskName);

    const taskDescription = document.createElement("p");
    if(task.hasDescription()){
        taskDescription.textContent = task.description;
        taskAndDateContainer.appendChild(taskDescription);
    }

    const dueTime = document.createElement("p");
    dueTime.className = "time"
    if (task.hasDate()) {
        dueTime.textContent = task.dueTime;
        taskAndDateContainer.appendChild(dueTime);
    }

    const editTaskButton = document.createElement("button");
    const editButtonImage = document.createElement("img");
    editButtonImage.src = editIcon;
    editTaskButton.appendChild(editButtonImage);

    const starTaskButton = document.createElement("button");
    const starIconImage = document.createElement("img");
    if(task.isStarred == false){
        starIconImage.src = starIcon;
    }else{
        starIconImage.src = starredIcon;
    }
    
    starTaskButton.appendChild(starIconImage);

    const taskDeleteButton = document.createElement("button");
    const deleteIconImage = document.createElement("img");
    deleteIconImage.src = trashIcon;
    taskDeleteButton.appendChild(deleteIconImage);
    
    taskContainer.append(completedCheckboxInput, taskAndDateContainer,editTaskButton, starTaskButton, taskDeleteButton);
    taskListContainer.appendChild(taskContainer);

    // Task buttons functionalities
    starTaskButton.addEventListener("click", (e)=>{
        task.toggleStarred();
        TaskObserver.notify();
    });

}