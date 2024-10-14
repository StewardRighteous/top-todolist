// TODO: Make Date sorting work

import {TaskSorter, Task} from "./barrel.js";
import { } from "date-fns";

// Contains a list of Tasks related to each other
export default class Project {
    _projectTitle;
    _tasks = [];
    _isShowProject = true;
    _allStarredTasks = [];

    // Order Booleans to on and off according to user's want
    isCreationOrder;
    isStarredOrder;
    isDueDateOrder;

    // CREATE
    constructor(title) {
        this._projectTitle = title;
        this.isCreationOrder = false;
        this.isStarredOrder = true;
        this.isDueDateOrder = false;
    }

    // READ
    get projectTitle() {
        return this._projectTitle;
    }

    get isShowProject() {
        return this._isShowProject;
    }

    // returns list according to the user's want
    get allTasks() {
        let tasks;
        if (this.isStarredOrder) {
            let sortedStarred = [...TaskSorter.sortUnstarredFromStarred(this._tasks)];
            tasks = [...TaskSorter.sortUncompletedToCompleted(sortedStarred)];
        } else {
            tasks = TaskSorter.sortUncompletedToCompleted(this._tasks);
        }
        return tasks;
    }

    getAllStarredTasks() {
        this._allStarredTasks = this._tasks.filter(task => task.starred == true);
        return this._allStarredTasks;
    }

    // UPDATE
    addTaskToProject(title, description, time, repeat, project) {
        let task = new Task(title, description, time, repeat, project);
        this._tasks.push(task);
    }


    set projectTitle(value) {
        this._projectTitle = value;
    }

    set isShowProject(value) {
        this._isShowProject = value;
    }

    renameProject(newProjectName) {
        this._projectTitle = newProjectName;
    }

    setCreationOrder() {
        this.isCreationOrder = true;
        this.isDueDateOrder = false;
        this.isStarredOrder = false;
    }

    setStarredOrder() {
        this.isCreationOrder = false;
        this.isDueDateOrder = false;
        this.isStarredOrder = true;
    }

    setDueDateOrder() {
        this.isCreationOrder = false;
        this.isDueDateOrder = true;
        this.isStarredOrder = false;
    }

    //DELETE 
    deleteTaskFromProject(deleteTask) {
        let taskIndex = this._tasks.findIndex(task => task == deleteTask);
        this._tasks.splice(taskIndex, 1);
    }

    deleteAllCompletedTasks() {
        const completedTasksIndex = [];
        this._tasks.forEach(task => {
            if (task.isCompleted) {
                let taskIndex = this._tasks.findIndex(eachTask => eachTask == task);
                completedTasksIndex.push(taskIndex);
            }
            completedTasksIndex.forEach(taskIndex => {
                this._tasks.splice(taskIndex, 1);
            })
        });
    }
}