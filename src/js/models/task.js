import {isToday, isTomorrow, isYesterday, dsy, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, isValid } from "date-fns";

// Each todo or task
export default class Task {
    title;
    description;
    rawTime; // To give date to  update dialog box input
    time;
    repeat;
    project;
    starred;
    completed;

    constructor(title, description, time, repeat, project) {
        this.title = title;
        this.description = description || "";
        this.rawTime = time;
        this.time = new Date(time) || new Date();
        this.repeat = repeat || false;
        this.project = project || "default";
        this.starred = false;
        this.completed = false;
    }

    get taskName(){
        return this.title;
    }

    get projectName(){
        return this.project;
    }

    get dueTime (){
        let taskDay;
        // Selecting which day 
        if(isToday(this.time)){
            taskDay = "Today";
        }else if(isTomorrow(this.time)){
            taskDay = "Tommorrow";
        }else if(isYesterday(this.time)){
            taskDay = "Yesterday";
        }else{
            const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            taskDay = `${month[this.time.getMonth()]} ${this.time.getDate()}`;
        }
        let dueTime = `${taskDay} ${this.time.getHours()}:${this.time.getMinutes()}`;
        return dueTime;
    }

    get isStarred(){
        return this.starred;
    }

    get isCompleted(){
        return this.completed;
    }

    hasDescription(){
        if(this.description == ""){
            return false;
        }
        return true;
    }

    hasDate(){
        if(isValid(this.time)){
            return true;
        }
        return false;
    }

    toggleStarred(){
        this.starred = (this.starred == false) ? true : false;
    }

    toggleCompleted(){
        this.completed = (this.completed == false) ? true : false;
    }

}