import Task from "./task";

// Contains a list of Tasks related to each other
export default class Project {
    _projectTitle;
    _tasks = [];
    _isShowProject = true;
    _allStarredTasks = [];

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

    // Function that sorts uncompleted tasks from completed tasks and puts it in front
    sortUncompletedToCompleted(){
        this._tasks.sort((a,b)=> {
            if(a.completed == false && b.completed == false || a.completed == true && b.completed == true){
                return 0;
            }if(a.completed == true){
                return 1;
            }else{
                return -1;
            }
        });
    }

    addTaskToProject(title, description, time, repeat, project) {
        let task = new Task(title, description, time, repeat, project);
        this._tasks.push(task);
        this.sortUncompletedToCompleted();
    }

    deleteTaskFromProject(taskTitle) {
        this._tasks = this._tasks.filter(value => value == taskTitle);
    }

    getAllStarredTasks(){
        this._allStarredTasks = this._tasks.filter(task => task.isStarred == true);
        return this._allStarredTasks;
    }

}