import { listDetailsManager, TaskObserver } from "../../manager/barrel";

// Dialog that will take a task and updates it with new details
export default function updateTaskDialog(task) {
    // Selecting content area
    const contentArea = document.querySelector("#content");

    const updateTaskDialog = document.createElement("dialog");

    const updateTaskHeading = document.createElement("h1");
    updateTaskHeading.textContent = "Add New Task";
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
    titleInput.value = task.title;

    // Task description
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.maxLength = 50;
    descriptionInput.value = task.description;

    // date option
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date";
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "datetime-local";
    dueDateInput.value = task.rawTime;

    // repeat option
    const repeatLabel = document.createElement("label");
    repeatLabel.textContent = "Repeat (everyday)";
    const repeatInput = document.createElement("input");
    repeatInput.type = "checkbox";
    repeatInput.checked = (task.repeat) ? true : false;

    // project dropdown
    const projectNameLabel = document.createElement("label");
    projectNameLabel.textContent = "Project Name";
    const projectListDropDown = document.createElement("select");
    projectListDropDown.id = "project-list";
    function addProjectsToProjectListDropdown() {
        while (projectListDropDown.children.length != 0) {
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
    projectListDropDown.value = task.projectName;

    // update task to project button
    const updateProjectButton = document.createElement("button");
    updateProjectButton.textContent = "Update Task";
    updateProjectButton.className = "update-button";

    // adding to dialog box
    const updateTaskDialogContainer = document.createElement("div");
    updateTaskDialogContainer.className = "add-new-task-dialog";
    updateTaskDialogContainer.append(updateTaskHeading, cancelButton, titleLabel, titleInput,
        descriptionLabel, descriptionInput, dueDateLabel, dueDateInput, dueDateInput, repeatLabel,
        repeatInput, projectNameLabel, projectListDropDown, updateProjectButton);
    updateTaskDialog.appendChild(updateTaskDialogContainer);
    contentArea.appendChild(updateTaskDialog);

    updateTaskDialog.showModal();

    // Button Functionalities
    cancelButton.addEventListener("click", ()=>{
        updateTaskDialog.close();
    });

    updateProjectButton.addEventListener("click", ()=>{
        task.title = titleInput.value;
        task.description = descriptionInput.value;
        task.time = new Date(dueDateInput.value);
        task.repeat = repeatInput.checked;
        task.project = projectListDropDown.value;
        TaskObserver.notify();
        updateTaskDialog.close();
    });
}