import { compareAsc } from 'date-fns';

// Class that deals with all sorting related operations when it comes tasks
const TaskSorter= ()=>{
     // Function that sorts starred and unstarred
     function sortUnstarredFromStarred(tasks) {
        let tasksCopy = [...tasks];
        tasksCopy.sort((a, b) => {
            if (a.starred == false && b.starred == false || a.starred == true && b.starred == true) {
                return 0;
            } if (a.starred == true) {
                return -1;
            } else {
                return 1;
            }
        });
        return tasksCopy;
    };

    // Function that sorts uncompleted tasks from completed tasks and puts it in front
    function sortUncompletedToCompleted(tasks) {
        tasks.sort((a, b) => {
            if (a.completed == false && b.completed == false || a.completed == true && b.completed == true) {
                return 0;
            } if (a.completed == true) {
                return 1;
            } else {
                return -1;
            }
        });
        return tasks;
    }

    function sortDueDates(tasks = []){
        tasks.sort((a,b) =>{
            let result = compareAsc(a.time, b.time);
            return result;
        });
        return tasks;
    };

    return{
        sortUncompletedToCompleted,
        sortUnstarredFromStarred,
        sortDueDates
    }
}

export default TaskSorter()