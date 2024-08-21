import Project from "./project.js";

let instance;

// One list that contains all projects and tasks for the whole app
export default class List {
    projects = [new Project("default")];

    constructor() {
        if (instance) {
            throw new Error("Only one instance can be created for list");
        }
        return this;
    }

    get allProjects() {
        return this.projects;
    }

    addProject({ projectName }) {
        this.projects.push(new Project(projectName));
    }

    deleteProject({ projectName }) {
        this.projects.filter(project => (project.projectName != projectName));
    }
}