// Each todo or task
export default class Task {
    _title;
    _description;
    _time;
    _repeat;
    _project;
    _starred;

    constructor(title, description, time, repeat, project, starred) {
        this._title = title;
        this._description = description || "";
        this._time = time || new Date().getDate();
        this._repeat = repeat || false;
        this._project = project || "default";
        this._starred = starred || false;
    }
}