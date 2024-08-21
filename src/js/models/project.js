export default class Project {
    _projectTitle;

    constructor(title) {
        this._projectTitle = title;
    }

    get projectTitle() {
        return this._projectTitle;
    }
    set projectTitle(value) {
        this._projectTitle = value;
    }
}