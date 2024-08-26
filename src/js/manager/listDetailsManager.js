import List from "./listStateManager"

class createListDetailsManager {
    // returns the containing project titles in the list
    getAllProjectTitles() {
        const projectTitles = [];
        for (let project of List.getList().allProjects) {
            let projectTitle = project.projectTitle;
            projectTitles.push(projectTitle);
        }
        return projectTitles;
    }
    // Adds project to the list of projects
    addToProject(nameOfProject) {
        List.getList().addProject(nameOfProject);
    }
}

export default new createListDetailsManager();