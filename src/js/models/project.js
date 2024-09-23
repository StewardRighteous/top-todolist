import Task from "./task";

// Contains a list of Tasks related to each other
export default class Project {
    _projectTitle;
    _tasks = [new Task()];
    _isShowProject = true;

    constructor(title) {
        this._projectTitle = title;
    }

    get projectTitle() {
        return this._projectTitle;
    }
    set projectTitle(value) {
        this._projectTitle = value;
    }

    get isShowProject() {
        return this._isShowProject;
    }

    set isShowProject(value){
        this._isShowProject = value;
    }

    get allTasks() {
        return this._tasks;
    }

    addTaskToProject(title, description, time, repeat, project) {
        let task = new Task(title, description, time, repeat, project);
        this._tasks.push(task);
    }

    deleteTaskFromProject(taskTitle) {
        this._tasks = this._tasks.filter(value => value == taskTitle);
    }
}