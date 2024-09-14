// Each todo or task
export default class Task {
    title;
    description;
    time;
    repeat;
    project;
    starred;

    constructor(title, description, time, repeat, project, starred) {
        this.title = title;
        this.description = description || "";
        this.time = new Date(time) || new Date();
        this.repeat = repeat || false;
        this.project = project || "default";
        this.starred = starred || false;
    }

    get taskTime (){
        let taskTime = `${this.time.getHours()}:${this.time.getMinutes()}`;
        return taskTime;
    }
}