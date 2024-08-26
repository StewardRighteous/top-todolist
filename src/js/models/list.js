import Project from "./project.js";

// Contains all the projects in the app
export default class List {
    _projects = [new Project("default")];

    get allProjects() {
        return this._projects;
    }

    addProject(projectName) {
        this._projects.push(new Project(projectName));
    }

    deleteProject(projectName) {
        this._projects = this._projects.filter(project => (project.projectName != projectName));
    }
}