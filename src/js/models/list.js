import Project from "./project.js";

// Contains all the projects in the app
export default class List {
    // CREATE
    _projects = [new Project("Default")];

    // READ
    get allProjects() {
        return this._projects;
    }

    // UPDATE
    addProject(projectName) {
        this._projects.push(new Project(projectName));
    }

    // DELETE
    // Deleting a project from the list
    deleteProject(projectName) {
        let projectIndex = this._projects.findIndex(project => project.projectName == projectName);
        this._projects.splice(projectIndex,1);
    }
}