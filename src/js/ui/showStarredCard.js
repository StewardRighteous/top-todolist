// This will return a starred card that will have only starred tasks
import { listDetailsManager, TaskObserver } from "../manager/barrel";
import settingsIconImage from "../../img/more-vertical.svg";
import trashIcon from "../../img/trash-2.svg";
import starIcon from "../../img/star.svg";
import starredIcon from "../../img/starred.svg";
import editIcon from "../../img/edit.svg";
import taskObserver from "../manager/task/taskObserver";

export default function showStarredCard(){
        // getting content area
    const contentArea = document.querySelector("#content");

    function removeProjectCardsFromContent() {
        while (contentArea.children.length != 0) {
            contentArea.firstChild.remove();
        }
    }

    removeProjectCardsFromContent();
    
    if(listDetailsManager.getAllStarredTasksFromAllProjects().length == 0){
        const starredMessageContainer = document.createElement("div");
        const noStarredTasksMessage = document.createElement("h1");
        noStarredTasksMessage.textContent = "No Starred Tasks. Click on Starred button in project tasks to add Starred Tasks.";
        starredMessageContainer.className = "no-starred-tasks";
        starredMessageContainer.appendChild(noStarredTasksMessage);
        contentArea.appendChild(starredMessageContainer);
    }else{
        // Starred Tasks card
        const starredTasksCard = document.createElement("div");
        starredTasksCard.className = "project-card"; // reusing project-card class for similar design

        const starredTaskHeadContainer = document.createElement("div");
        starredTaskHeadContainer.className = "project-head"; // reusing project-head class for similar design
        
        const starredTaskTitle = document.createElement("h1");
        starredTaskTitle.textContent = "Starred Tasks";

        const starredTaskSettingsButton = document.createElement("button");
        const settingsImage = document.createElement("img");
        settingsImage.src = settingsIconImage;
        starredTaskSettingsButton.appendChild(settingsImage);

        const starredTasksListContainer = document.createElement("div");
        starredTasksListContainer.className = "tasks-list"; //reusing tasks-list class for similar design

        for( let starredTask of listDetailsManager.getAllStarredTasksFromAllProjects()){
            // task container with checkboxes[completed], name, due date, delete button and star button
            const starredTaskContainer = document.createElement("div");
            starredTaskContainer.className = "task";

            const completedCheckboxInput = document.createElement("input");
            completedCheckboxInput.type = "checkbox";

            const taskAndDateContainer = document.createElement("div");
            taskAndDateContainer.className = "task-name-desc-date"

            const taskName = document.createElement("h1");
            taskName.textContent = starredTask.title;
            taskAndDateContainer.appendChild(taskName);

            const taskDescription = document.createElement("p");
            if(starredTask.hasDescription()){
                taskDescription.textContent = starredTask.description;
                taskAndDateContainer.appendChild(taskDescription);
            }

            const dueTime = document.createElement("p");
            dueTime.className = "time"
            if (starredTask.hasDate()) {
                dueTime.textContent = starredTask.dueTime;
                taskAndDateContainer.appendChild(dueTime);
            }

            const editTaskButton = document.createElement("button");
            const editButtonImage = document.createElement("img");
            editButtonImage.src = editIcon;
            editTaskButton.appendChild(editButtonImage);

            const starTaskButton = document.createElement("button");
            const starIconImage = document.createElement("img");
            if(starredTask.isStarred == false){
                starIconImage.src = starIcon;
            }else{
                starIconImage.src = starredIcon;
            }
            
            starTaskButton.appendChild(starIconImage);

            const taskDeleteButton = document.createElement("button");
            const deleteIconImage = document.createElement("img");
            deleteIconImage.src = trashIcon;
            taskDeleteButton.appendChild(deleteIconImage);
            
            starredTaskContainer.append(completedCheckboxInput, taskAndDateContainer,editTaskButton, starTaskButton, taskDeleteButton);
            starredTasksListContainer.appendChild(starredTaskContainer);

            // Task buttons functionalities
            starTaskButton.addEventListener("click", (e)=>{
                task.toggleStarred();
                taskObserver.notify();
            });
        }

        // Appending everything together 
        starredTaskHeadContainer.append(starredTaskTitle, starredTaskSettingsButton);
        starredTasksCard.append(starredTaskHeadContainer, starredTasksListContainer);
        contentArea.appendChild(starredTasksCard);
    }
}
