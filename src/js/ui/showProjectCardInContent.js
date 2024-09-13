// This function will create an UI that will show all the tasks and the projects in the content area of the page

import settingsIconImage from "../../img/settings.svg";
import { listDetailsManager, ListObserver, TaskObserver } from "../manager/barrel";

export default function showProjectCardInContent() {
    // getting content area
    const contentArea = document.querySelector("#content");

    function removeProjectCardsFromContent() {
        while (contentArea.children.length != 0) {
            contentArea.firstChild.remove();
        }
    }

    removeProjectCardsFromContent() // To avoid duplication

    for (let project of listDetailsManager.getAllProjectsWithTasks()) {
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

        function removeTasksFromTaskContainer(){
            while(taskContainer.children.length != 0){
                taskContainer.firstChild.remove();
            }
        }

        function addTaskContentToProjectCard(){
            removeTasksFromTaskContainer(); // To avoid duplication
            for(let task of project.allTasks){
                const completedCheckboxInput = document.createElement("input");
                completedCheckboxInput.type = "checkbox";
    
                const taskName = document.createElement("p");
                taskName.textContent = task.title;
    
                taskContainer.append(completedCheckboxInput, taskName);
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

ListObserver.subscribe(showProjectCardInContent);