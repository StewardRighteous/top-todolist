// Class that deals with parsing and adding data from the List to be used by others
import Task from "../../models/task";
import List from "./listStateManager"

class createListDetailsManager {
    // Function that can be reused to get allProjects
    getAllProjects(){
        return List.getList().allProjects;
    } 

    // returns the title of all projects in the list
    getAllProjectTitles() {
        const projectTitles = [];
        for (let project of List.getList().allProjects) {
            let projectTitle = project.projectTitle;
            projectTitles.push(projectTitle);
        }
        return projectTitles;
    }

    // Adds project to the list of projects
    addToListOfProjects(nameOfProject) {
        List.getList().addProject(nameOfProject);
    }

    // Adds task to the project in the list
    addTaskToProject(projectName, title, description, time, repeat, project) {
        let allProjects = this.getAllProjects();
        let indexOfProject = allProjects.findIndex(project => project.projectTitle == projectName);
        allProjects[indexOfProject].addTaskToProject(title, description, time, repeat, project);
    }

    // returns all the starred tasks in those projects
    getAllStarredTasksFromAllProjects(){
        let starredTasks = [];
        let allProjects = this.getAllProjects();
        allProjects.forEach(project => {
            let starredTaskFromProject = project.getAllStarredTasks();
            starredTasks = starredTasks.concat(starredTaskFromProject);
        });
        return starredTasks;
    }

    changeShowOrHideProjectCard(projectName, isShow){
        let allProjects = this.getAllProjects();
        let projectIndex = allProjects.findIndex(project => project.projectTitle == projectName);
        allProjects[projectIndex].isShowProject = isShow;
    }

    getShowOrHideProjectCard(projectName){
        let allProjects = this.getAllProjects();
        let projectIndex = allProjects.findIndex(project => project.projectTitle == projectName);
        let isShow = allProjects[projectIndex].isShowProject;
        return isShow;
    }

    isAllCardsHidden(){
        let allProjects = this.getAllProjects();
        let showProject = allProjects.filter(project => project.isShowProject == true);
        if(showProject.length == 0){
            return true;
        }
        return false;
    }

    deleteProjectFromList(projectName){
        List.getList().deleteProject(projectName);
    }
}

export default new createListDetailsManager();