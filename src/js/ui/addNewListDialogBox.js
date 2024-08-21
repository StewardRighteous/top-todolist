import listManager from "../manager/listManager.js";

export default function addNewListDialogBox() {
    // show add new list dialog when clicked on it
    const navigationPane = document.querySelector("nav");
    const listSectionContainer = navigationPane.querySelector(".lists-section");
    const addNewProjectButton = listSectionContainer.querySelector("button.add-new-list");

    // Creating Dialog Box with its content
    const newProjectCreationDialog = document.createElement("dialog");

    const enterProjectNameLabel = document.createElement("label");
    enterProjectNameLabel.textContent = "Enter New Project Name: ";
    enterProjectNameLabel.for = "new-project";

    const projectNameInput = document.createElement("input");
    projectNameInput.type = "text";
    projectNameInput.minLength = 3;
    projectNameInput.maxLength = 20;
    projectNameInput.id = "new-project";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttons"; 
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Create";
    const declineButton = document.createElement("button");
    declineButton.textContent = "Cancel";

    buttonContainer.append(addProjectButton, declineButton);
    newProjectCreationDialog.append(enterProjectNameLabel, projectNameInput, buttonContainer);
    navigationPane.append(newProjectCreationDialog);

    addNewProjectButton.addEventListener("click", () => {
        newProjectCreationDialog.showModal();
    });

    declineButton.addEventListener("click", () => {
        newProjectCreationDialog.close();
    });

    addProjectButton.addEventListener("click", ()=>{
        if(projectNameInput.value.length <= 3){
            alert("Please Enter Project name");
        }else{
            let projectName = projectNameInput.value;
            listManager.addToProject(projectName);
            newProjectCreationDialog.close();
        }
    });
}