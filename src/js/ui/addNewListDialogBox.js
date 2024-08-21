

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
    projectNameInput.maxLength = 20;
    projectNameInput.id = "new-project";
    const addProjectButton = document.createElement("button");
    const declineButton = document.createElement("button");
    addProjectButton.textContent = "Create";
    declineButton.textContent = "Cancel";
    newProjectCreationDialog.append(enterProjectNameLabel, projectNameInput, addProjectButton, declineButton);
    navigationPane.append(newProjectCreationDialog);

    addNewProjectButton.addEventListener("click", () => {
        newProjectCreationDialog.showModal();
    });

    declineButton.addEventListener("click", () => {
        newProjectCreationDialog.close();
    });

    addProjectButton.addEventListener("click", ()=>{

    });
}