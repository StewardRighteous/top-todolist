import deleteImage from "../../img/trash-2.svg";
import listManager from "../../js/manager/listManager.js"

// show all projects (default + stored ones)
export default function showAllProjectsInNav() {
    const navigationPane = document.querySelector("nav");
    const listSection = navigationPane.querySelector(".lists-section");
    const projectList = listSection.querySelector(".projects");

    for (let project of listManager.getAllProjectTitles()) {
        const showProjectContainer = document.createElement("div");
        showProjectContainer.className = "project-options";
        const toggleShowProjectCheckbox = document.createElement("input");
        toggleShowProjectCheckbox.type = "checkbox";
        const projectTitle = document.createElement("p");
        projectTitle.textContent = project;
        const deleteProjectButton = document.createElement("button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteImage;
        deleteProjectButton.appendChild(deleteIcon);

        if (project == listManager.getAllProjectTitles().at(0)) {
            showProjectContainer.append(toggleShowProjectCheckbox, projectTitle);
            projectList.appendChild(showProjectContainer);
        } else {
            showProjectContainer.append(toggleShowProjectCheckbox, projectTitle, deleteProjectButton);
            projectList.appendChild(showProjectContainer);
        }
    }
}
