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
    return {
        getAllProjectTitles
    }
}

export default createListManager();