// This function will create an UI for showing and deleting projects in the Navigation pane

// Trash icon for deleting option
import deleteImage from "../../img/trash-2.svg";
import {listDetailsManager, Observer} from "../manager/barrel.js";

export default function showAllProjectsInNav() {
    // getting navigation pane
    const navigationPane = document.querySelector("nav");
    const listSection = navigationPane.querySelector(".lists-section");
    const projectList = listSection.querySelector(".projects");

    // removing previously existing projects incase of reload to show newly added project
    function removeAllElementsFromProject(){
        while(projectList.children.length != 0){
            projectList.firstChild.remove();
        }
    }

    removeAllElementsFromProject();

    // creating project container that has show [checkbox], name [project name] and delete[button] options.
    for (let project of listDetailsManager.getAllProjectTitles()) {
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

        // not showing delete option to the default project
        if (project == listDetailsManager.getAllProjectTitles().at(0)) {
            showProjectContainer.append(toggleShowProjectCheckbox, projectTitle);
            projectList.appendChild(showProjectContainer);
        } else {
            showProjectContainer.append(toggleShowProjectCheckbox, projectTitle, deleteProjectButton);
            projectList.appendChild(showProjectContainer);
        }
    }
}

// Adding to observer so the function can be called anytime a new project is created in the list
Observer.subscribe(showAllProjectsInNav);
