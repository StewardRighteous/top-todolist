import List from "../models/list.js";

function createListManager() {
    // initializing list for whole app
    const listOfProjects = new List();

    // returns the containing project titles in the list
    function getAllProjectTitles() {
        const projectTitles = [];
        for (let project of listOfProjects.allProjects) {
            let projectTitle = project.projectTitle;
            projectTitles.push(projectTitle);
        }
        return projectTitles;
    }
    // Adds project to the list of projects
    function addToProject(nameOfProject) {
        listOfProjects.addProject(nameOfProject);
    }
    return {
        getAllProjectTitles,
        addToProject
    }
}

export default createListManager();