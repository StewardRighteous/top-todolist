// Shows a list dialog box when clicked on add list button in Navigation Pane

import {listDetailsManager, ListObserver} from "../manager/barrel.js";

export default function showAddNewListDialogBox() {
    // getting navigation pane button
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

    // opens the dialog box when clicked on add list button
    addNewProjectButton.addEventListener("click", () => {
        newProjectCreationDialog.showModal();
    });

    // closes dialog box without creating any new list (project) 
    declineButton.addEventListener("click", () => {
        newProjectCreationDialog.close();
    });

    // creates a new project and add it to the list
    addProjectButton.addEventListener("click", ()=>{
        // check for name to be atleast 3 characaters long
        if(projectNameInput.value.length <= 2){
            alert("Please Enter Project name");
        }else{
            let projectName = projectNameInput.value;
            listDetailsManager.addToListOfProjects(projectName);
            newProjectCreationDialog.close();
            // Reloads the project list in NAV with the added new project
            ListObserver.notify();
        }
    });
}