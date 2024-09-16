import {isToday, isTomorrow, isYesterday, dsy, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, isValid } from "date-fns";

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
}