// Class that deals with parsing and adding data from the List to be used by others
import List from "./listStateManager"

class createListDetailsManager {
    // returns the title of all projects in the list
    getAllProjectTitles() {
        const projectTitles = [];
        for (let project of List.getList().allProjects) {
            let projectTitle = project.projectTitle;
            projectTitles.push(projectTitle);
        }
        return projectTitles;
    }

    // Adds project to the list of projects
    addToListOfProjects(nameOfProject) {
        List.getList().addProject(nameOfProject);
    }
}

export default new createListDetailsManager();