import Project from "./project.js";

// Contains all the projects in the app
export default class List {
    _projects = [new Project("Default")];

    get allProjects() {
        return this._projects;
    }

    addProject(projectName) {
        this._projects.push(new Project(projectName));
    }

    // Deleting a project from the list
    deleteProject(projectName) {
        let projectIndex = this._projects.findIndex(project => project.projectName == projectName);
        this._projects.splice(projectIndex,1);
    }
}