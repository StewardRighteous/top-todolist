// This will return a starred card that will have only starred tasks
import { listDetailsManager, ProjectObserver, TaskObserver } from "../manager/barrel";
import settingsIconImage from "../../img/more-vertical.svg";
import { createTaskContainer } from "./barrel.js";

export default function showStarredCard() {
    // Changing button background color of Starred Tasks Button to show we are in starred tasks section
    const navigation = document.querySelector("nav");
    const sectionButtons = navigation.querySelector(".section-buttons");
    const allTasksButton = sectionButtons.querySelector("#all-tasks");
    const starredTasksButton = sectionButtons.querySelector("#starred-tasks");

    starredTasksButton.style.backgroundColor = "var(--secondary)";
    allTasksButton.style.backgroundColor = "var(--background)";

    // getting content area
    const contentArea = document.querySelector("#content");

    function removeProjectCardsFromContent() {
        while (contentArea.children.length != 0) {
            contentArea.firstChild.remove();
        }
    }

    removeProjectCardsFromContent();

    // Show No Starred Tasks message incase of no starred tasks
    if (listDetailsManager.getAllStarredTasksFromAllProjects().length == 0) {
        const starredMessageContainer = document.createElement("div");
        const noStarredTasksMessage = document.createElement("h1");
        noStarredTasksMessage.textContent = "No Starred Tasks. Click on Starred button in project tasks to add Starred Tasks.";
        starredMessageContainer.className = "no-starred-tasks";
        starredMessageContainer.appendChild(noStarredTasksMessage);
        contentArea.appendChild(starredMessageContainer);
    } else {
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

        for (let starredTask of listDetailsManager.getAllStarredTasksFromAllProjects()) {

            function removeTasksFromStarredTaskContainer(){
                while(starredTasksListContainer.children.length != 0){
                    starredTasksListContainer.firstChild.remove();
                }
            }

            function addTaskContentToStarredCard() {
                removeTasksFromStarredTaskContainer();
                // task container with checkboxes[completed], name, due date, delete button and star button
               createTaskContainer(starredTask, starredTasksListContainer);
            }
            addTaskContentToStarredCard();
            TaskObserver.subscribe(addTaskContentToStarredCard);
        }

        // Appending everything together 
        starredTaskHeadContainer.append(starredTaskTitle, starredTaskSettingsButton);
        starredTasksCard.append(starredTaskHeadContainer, starredTasksListContainer);
        contentArea.appendChild(starredTasksCard);
    }
}

TaskObserver.notify(showStarredCard);
