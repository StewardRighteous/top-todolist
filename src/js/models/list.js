import Project from "./project.js";

let instance;

// One list that contains all projects and tasks for the whole app
export default class List {
    _projects = [new Project("default")];

    constructor() {
        if (instance) {
            throw new Error("Only one instance can be created for list");
        }
        return this;
    }

    get allProjects() {
        return this._projects;
    }

    addProject(projectName) {
        this._projects.push(new Project(projectName));
    }

    deleteProject(projectName) {
        this._projects.filter(project => (project.projectName != projectName));
    }
}