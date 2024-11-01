import {ListObserver, TaskObserver, ProjectObserver, listDetailsManager} from "./../barrel.js";
import ListState from "../list/listStateManager.js";

class StorageManager{
    subscribeStorageToChanges(){
        ListObserver.subscribe(ListState.saveToLocal);
        TaskObserver.subscribe(ListState.saveToLocal);
        ProjectObserver.subscribe(ListState.saveToLocal);
    }

    getFromLocal(){
        if(!localStorage.getItem("all-todos")){
            return;
        }else{
            // getting stored json
            let alreadySavedData = JSON.parse(localStorage.getItem("all-todos"));
            // creating projects for the stored
            alreadySavedData._projects.forEach((project)=>{
                if(project._projectTitle == "Default" ){
                }else{
                    listDetailsManager.addToListOfProjects(project._projectTitle);
                }
                // adding tasks to the stored projects
                project._tasks.forEach((task) =>{
                    listDetailsManager.addTaskToProject(project._projectTitle, 
                        task.title, 
                        task.description,
                        task.rawTime,
                        task.repeat,
                        task.project,
                    )
                });
                
            });
            TaskObserver.notify();
            ProjectObserver.notify();
            ListObserver.notify();
        }
    }
}

export default new StorageManager();