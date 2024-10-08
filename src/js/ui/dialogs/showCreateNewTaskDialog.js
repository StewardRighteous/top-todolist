import { listDetailsManager, ListObserver, TaskObserver } from "../../manager/barrel.js";

// Showing create new dialog box on Create new Task button click
export default function showCreateNewTaskDialog() {
    // getting navigation pane
    const navigationPane = document.querySelector("nav");
    const createTaskClass = navigationPane.querySelector(".create-task");
    const createTaskButton = createTaskClass.querySelector("button");

    // creating dialog box
    const addNewTaskDialog = document.createElement("dialog");

    const addNewTaskHeading = document.createElement("h1");
    addNewTaskHeading.textContent = "Add New Task";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "❌";
    cancelButton.className = "cancel-dialog";

    // Task title
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.maxLength = 20;
    titleInput.minLength = 2;
    titleInput.required = true;
    titleInput.autofocus = true;    

    // Task description
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.maxLength = 50;

    // date option
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date";
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "datetime-local";

    // repeat option
    const repeatLabel = document.createElement("label");
    repeatLabel.textContent = "Repeat (everyday)";
    const repeatInput = document.createElement("input");
    repeatInput.type = "checkbox";

    // project dropdown
    const projectNameLabel = document.createElement("label");
    projectNameLabel.textContent = "Project Name";
    const projectListDropDown = document.createElement("select");
    projectListDropDown.id = "project-list";
    function addProjectsToProjectListDropdown(){
        while(projectListDropDown.children.length != 0){
            projectListDropDown.firstChild.remove();
        }
        for (let projectName of listDetailsManager.getAllProjectTitles()) {
            const projectNameOption = document.createElement("option");
            projectNameOption.value = projectName;
            projectNameOption.text = projectName;
            projectListDropDown.append(projectNameOption);
        }
    }
    addProjectsToProjectListDropdown();
    ListObserver.subscribe(addProjectsToProjectListDropdown);

    // add task to project button
    const addTaskToProjectButton = document.createElement("button");
    addTaskToProjectButton.textContent = "Add Task";
    addTaskToProjectButton.className = "add-task-button";

    // adding to dialog box
    const addNewTaskDialogContainer = document.createElement("div");
    addNewTaskDialogContainer.className = "add-new-task-dialog";
    addNewTaskDialogContainer.append(addNewTaskHeading, cancelButton, titleLabel, titleInput,
        descriptionLabel, descriptionInput, dueDateLabel, dueDateInput, dueDateInput, repeatLabel,
        repeatInput, projectNameLabel, projectListDropDown, addTaskToProjectButton);
    addNewTaskDialog.appendChild(addNewTaskDialogContainer);
    navigationPane.appendChild(addNewTaskDialog);

    // button functions
    addTaskToProjectButton.addEventListener("click", () => {
        if(titleInput.value.length < 3){
            alert ("Task name should have atleat 3 letters");
            titleInput.value = "";
        }else{
            listDetailsManager.addTaskToProject(projectListDropDown.value, 
                titleInput.value, 
                descriptionInput.value,
                dueDateInput.value,
                repeatInput.checked,
                projectListDropDown.value
            );
            addNewTaskDialog.close();
            titleInput.value = descriptionInput.value = dueDateInput.value = "";
            repeatInput.checked = false;
            TaskObserver.notify();
        }
    });

    createTaskButton.addEventListener("click", () => {
        addNewTaskDialog.showModal();
    });

    cancelButton.addEventListener("click", () => {
        addNewTaskDialog.close();
        titleInput.value = descriptionInput.value = dueDateInput.value = "";
        repeatInput.checked = false;
    });
}
