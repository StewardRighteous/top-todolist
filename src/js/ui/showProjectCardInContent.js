// This function will create an UI that will show all the tasks and the projects in the content area of the page

import settingsIconImage from "../../img/settings.svg";
import { listDetailsManager, ListObserver, ProjectObserver, TaskObserver } from "../manager/barrel";
import {} from "date-fns"

export default function showProjectCardInContent() {
    // getting content area
    const contentArea = document.querySelector("#content");

    function removeProjectCardsFromContent() {
        while (contentArea.children.length != 0) {
            contentArea.firstChild.remove();
        }
    }

    removeProjectCardsFromContent() // To avoid duplication

    // Hidden Card if All cards are hidden
    if(listDetailsManager.isAllCardsHidden()){
        const hiddenMessage = document.createElement("h1");
        hiddenMessage.textContent = 
            "All Cards are Hidden, Please Select a project in Sidebar to See your Tasks.";
        hiddenMessage.style.textAlign = "center";
        hiddenMessage.style.border = "2px solid var(--text)";
        contentArea.appendChild(hiddenMessage);
    }else{
        for (let project of listDetailsManager.getAllProjectsWithTasks()) {
            if (project.isShowProject) {
                // project card
                const projectCard = document.createElement("div");
                projectCard.className = "project-card";
    
                // title of the project
                const projectTitle = document.createElement("h1");
                projectTitle.textContent = project.projectTitle;
    
                // add new Task to project button
                const addTaskButton = document.createElement("button");
                addTaskButton.textContent = "Add Task";
    
                // settings button
                const settingsButton = document.createElement("button");
                const settingsIcon = document.createElement("img");
                settingsIcon.src = settingsIconImage;
                settingsButton.appendChild(settingsIcon);
    
                //tasks in that particular project
                const taskContainer = document.createElement("div");
                taskContainer.className = "tasks-list";
    
                function removeTasksFromTaskContainer() {
                    while (taskContainer.children.length != 0) {
                        taskContainer.firstChild.remove();
                    }
                }
    
                function addTaskContentToProjectCard() {
                    removeTasksFromTaskContainer(); // To avoid duplication
                    for (let task of project.allTasks) {
                        const completedCheckboxInput = document.createElement("input");
                        completedCheckboxInput.type = "checkbox";

                        const taskAndDateContainer = document.createElement("div");
                        taskAndDateContainer.className = "task-name-date"
    
                        const taskName = document.createElement("p");
                        taskName.textContent = task.title;

                        const dueTime = document.createElement("p");
                        dueTime.textContent = task.taskTime;
    
                        taskAndDateContainer.append(taskName, dueTime)
                        taskContainer.append(completedCheckboxInput, taskAndDateContainer);
                    }
                }
    
                addTaskContentToProjectCard();
                TaskObserver.subscribe(addTaskContentToProjectCard);
    
                projectCard.append(
                    projectTitle,
                    settingsButton,
                    addTaskButton,
                    taskContainer
                );
                contentArea.appendChild(projectCard);
            }
        }
    }
}

ListObserver.subscribe(showProjectCardInContent);
ProjectObserver.subscribe(showProjectCardInContent);