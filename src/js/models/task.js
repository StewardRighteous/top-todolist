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
        this.time = time || new Date().getDate();
        this.repeat = repeat || false;
        this.project = project || "default";
        this.starred = starred || false;
    }
}