// Showing create new dialog box on button click
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

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.maxLength = 20;
    titleInput.minLength = 2

    addNewTaskDialog.append(addNewTaskHeading, cancelButton, titleLabel, titleInput);
    navigationPane.append(addNewTaskDialog);

    createTaskButton.addEventListener("click", () => {
        addNewTaskDialog.showModal();
    });

    cancelButton.addEventListener("click", ()=>{
        addNewTaskDialog.close();
    });
}