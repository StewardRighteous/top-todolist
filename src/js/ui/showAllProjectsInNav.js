// This function will create an UI for showing and deleting projects in the Navigation pane

// Trash icon for deleting option
import deleteImage from "../../img/trash-2.svg";
import { listDetailsManager, ListObserver, ProjectObserver } from "../manager/barrel.js";

export default function showAllProjectsInNav() {
    // getting navigation pane
    const navigationPane = document.querySelector("nav");
    const listSection = navigationPane.querySelector(".lists-section");
    const projectList = listSection.querySelector(".projects");

    // removing previously existing projects incase of reload to show newly added project
    function removeAllElementsFromProject() {
        while (projectList.children.length != 0) {
            projectList.firstChild.remove();
        }
    }

    removeAllElementsFromProject();

    // creating project container that has show [checkbox], name [project name] and delete[button] options.
    for (let projectTitle of listDetailsManager.getAllProjectTitles()) {
        const showProjectContainer = document.createElement("div");
        showProjectContainer.className = "project-options";

        const toggleShowProjectCheckbox = document.createElement("input");
        toggleShowProjectCheckbox.type = "checkbox";
        if (listDetailsManager.getShowOrHideProjectCard(projectTitle)) {
            toggleShowProjectCheckbox.checked = true;
        }

        const projectTitleParagraph = document.createElement("p");
        projectTitleParagraph.textContent = projectTitle;

        const deleteProjectButton = document.createElement("button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteImage;
        deleteProjectButton.appendChild(deleteIcon);

        // not showing delete option to the default project
        if (projectTitle == listDetailsManager.getAllProjectTitles().at(0)) {
            showProjectContainer.append(toggleShowProjectCheckbox, projectTitleParagraph);
            projectList.appendChild(showProjectContainer);
        } else {
            showProjectContainer.append(toggleShowProjectCheckbox, projectTitleParagraph, deleteProjectButton);
            projectList.appendChild(showProjectContainer);
        }

        // Hiding and showing project card according to this checkbox
        toggleShowProjectCheckbox.addEventListener("click", () => {
            listDetailsManager.changeShowOrHideProjectCard(projectTitle, toggleShowProjectCheckbox.checked);
            ProjectObserver.notify();
        });

        // delete project after confirmation
        deleteProjectButton.addEventListener("click", () => {
            // Go to all Tasks section - [while list is deleted when it is in starred tasks page]
            const navigation = document.querySelector("nav");
            const sectionButtons = navigation.querySelector(".section-buttons");
            const allTasksButton = sectionButtons.querySelector("#all-tasks");
            const starredTasksButton = sectionButtons.querySelector("#starred-tasks");

            let confirmDeleteProject = confirm("Do you want to delete this project ? \n (The deleted data cannot be retrieved )");
            if (confirmDeleteProject) {
                listDetailsManager.deleteProjectFromList(projectTitle);
                allTasksButton.style.backgroundColor = "var(--secondary)";
                starredTasksButton.style.backgroundColor = "var(--background)";
                ListObserver.notify();
            }
        });
    }
}

// Adding to observer so the function can be called anytime a new project is created in the list
ListObserver.subscribe(showAllProjectsInNav);
