// This function will create an UI that will show all the tasks and the projects in the content area of the page

import settingsIconImage from "../../img/more-vertical.svg";
import sortingIconImage from "../../img/sort.svg";
import { listDetailsManager, ListObserver, ProjectObserver, TaskObserver } from "../manager/barrel";
import listObserver from "../manager/list/listObserver.js";
import { createTaskContainer } from "./barrel.js";

export default function showProjectCardInContent() {
    // Changing button background color of All Tasks Button to show we are in all tasks section
    const navigation = document.querySelector("nav");
    const sectionButtons = navigation.querySelector(".section-buttons");
    const allTasksButton = sectionButtons.querySelector("#all-tasks");
    const starredTasksButton = sectionButtons.querySelector("#starred-tasks");

    allTasksButton.style.backgroundColor = "var(--secondary)";
    starredTasksButton.style.backgroundColor = "var(--background)";

    // getting content area
    const contentArea = document.querySelector("#content");

    function removeProjectCardsFromContent() {
        while (contentArea.children.length != 0) {
            contentArea.firstChild.remove();
        }
    }

    removeProjectCardsFromContent() // To avoid duplication

    // Hidden Card if All cards are hidden
    if (listDetailsManager.isAllCardsHidden()) {
        const hiddenMessage = document.createElement("h1");
        hiddenMessage.textContent =
            "All Cards are Hidden, Please Select a project in Sidebar to See your Tasks.";
        hiddenMessage.style.textAlign = "center";
        hiddenMessage.style.border = "2px solid var(--text)";
        contentArea.appendChild(hiddenMessage);
    } else {
        for (let project of listDetailsManager.getAllProjects()) {
            if (project.isShowProject) {
                // project card
                const projectHeadContainer = document.createElement("div");
                projectHeadContainer.className = "project-head";

                const projectCard = document.createElement("div");
                projectCard.className = "project-card";

                // title of the project
                const projectTitle = document.createElement("h1");
                projectTitle.textContent = project.projectTitle;

                // add new Task to project button
                const addTaskButton = document.createElement("button");
                addTaskButton.textContent = "Add Task";
                addTaskButton.addEventListener("click", () => {
                    // show add new task dialog when clicked[The project name in dropdown should match with current project]
                    const navigationPane = document.querySelector("nav");
                    const allDialogs = navigationPane.querySelectorAll("dialog");
                    const addNewTaskDialog = allDialogs[1];
                    const dropDownSelect = addNewTaskDialog.querySelector("select");
                    dropDownSelect.value = project.projectTitle;
                    addNewTaskDialog.showModal();
                });

                // sorting button
                const sortingButton = document.createElement("button");
                const sortingIcon = document.createElement("img");
                sortingIcon.src = sortingIconImage;
                sortingButton.appendChild(sortingIcon);
                sortingButton.addEventListener("click", () => {
                    sortDialogPopup.show();

                });

                // settings button
                const settingsButton = document.createElement("button");
                const settingsIcon = document.createElement("img");
                settingsIcon.src = settingsIconImage;
                settingsButton.appendChild(settingsIcon);
                settingsButton.addEventListener("click", ()=>{
                    settingsDialogPopup.show();
                });

                projectHeadContainer.append(projectTitle, sortingButton, settingsButton, addTaskButton);

                //tasks in that particular project
                const taskListContainer = document.createElement("div");
                taskListContainer.className = "tasks-list";

                function removeTasksFromTaskContainer() {
                    while (taskListContainer.children.length != 0) {
                        taskListContainer.firstChild.remove();
                    }
                }

                // Each task options
                function addTaskContentToProjectCard() {
                    removeTasksFromTaskContainer(); // To avoid duplication
                    for (let task of project.allTasks) {
                        // task container with checkboxes[completed], name, due date, delete button and star button
                        createTaskContainer(task, taskListContainer);
                    }
                }

                TaskObserver.subscribe(addTaskContentToProjectCard);
                addTaskContentToProjectCard();
                TaskObserver.subscribe(addTaskContentToProjectCard);

                // Dialog to Sort between date, creation order, starred
                const sortDialogPopup = document.createElement("dialog");

                const sortCreationOrderButton = document.createElement("button");
                sortCreationOrderButton.textContent = "Creation Order";
                sortCreationOrderButton.addEventListener("click", ()=>{
                    listDetailsManager.sortProjectTasksToCreationOrder(project);
                    ProjectObserver.notify();
                    sortDialogPopup.close();
                });

                const sortStarredOrderButton = document.createElement("button");
                sortStarredOrderButton.textContent = "Starred";
                sortStarredOrderButton.addEventListener("click", ()=>{
                    listDetailsManager.sortProjectTasksToStarredOrder(project);
                    ProjectObserver.notify();
                    sortDialogPopup.close();
                });

                const sortDueDateOrderButton = document.createElement("button");
                sortDueDateOrderButton.textContent = "Due Date";
                sortDueDateOrderButton.addEventListener("click", ()=>{
                    listDetailsManager.sortProjectTasksToDueDateOrder(project);
                    ProjectObserver.notify();
                    sortDialogPopup.close();
                });

                const closeSortDialogPopupButton = document.createElement("button");
                closeSortDialogPopupButton.textContent = "Cancel";
                closeSortDialogPopupButton.style.backgroundColor = "red";
                closeSortDialogPopupButton.addEventListener("click", () => {
                    sortDialogPopup.close();
                });

                sortDialogPopup.append("Sort by", 
                    sortCreationOrderButton, 
                    sortStarredOrderButton, 
                    sortDueDateOrderButton, 
                    closeSortDialogPopupButton);

                // Dialog to show settings for renaming and delete all completed tasks
                const settingsDialogPopup = document.createElement("dialog");

                const renameProjectButton = document.createElement("button");
                renameProjectButton.textContent = "Rename";
                renameProjectButton.addEventListener("click", ()=>{
                    let newProjectName = prompt("Enter New Project Name: ");
                    if(newProjectName.length <= 2){
                        alert("Project name should be atleast 3 characters long");
                        newProjectName = prompt("Enter New Project Name: ")
                    }else{
                        listDetailsManager.renameProject(project, newProjectName);
                        listObserver.notify();
                    }
                });

                const deleteAllCompletedTasksButton = document.createElement("button");
                deleteAllCompletedTasksButton.textContent = "Delete All Completed Tasks";
                deleteAllCompletedTasksButton.addEventListener("click", ()=>{
                    listDetailsManager.deleteAllCompletedTasks(project);
                    ProjectObserver.notify();
                });

                const closeSettingsDialogButton = document.createElement("button");
                closeSettingsDialogButton.textContent = "Cancel";
                closeSettingsDialogButton.style.backgroundColor = "red";
                closeSettingsDialogButton.addEventListener("click", ()=>{
                    settingsDialogPopup.close();
                });

                settingsDialogPopup.append(
                    renameProjectButton,
                    deleteAllCompletedTasksButton,
                    closeSettingsDialogButton
                );

                projectCard.append(
                    projectHeadContainer,
                    taskListContainer,
                    sortDialogPopup,
                    settingsDialogPopup
                );
                contentArea.appendChild(projectCard);
            }
        }
    }
}

ListObserver.subscribe(showProjectCardInContent);
ProjectObserver.subscribe(showProjectCardInContent);