// Class that deals with parsing and adding data from the List to be used by others
import Task from "../../models/task";
import List from "./listStateManager"

class createListDetailsManager {
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
        let indexOfProject = List.getList().allProjects.findIndex(project => project.projectTitle == projectName);
        List.getList().allProjects[indexOfProject].addTaskToProject(title, description, time, repeat, project);
    }

    // returns projects with its tasks
    getAllProjectsWithTasks(){
        return List.getList().allProjects;
    }

    changeShowOrHideProjectCard(projectName, isShow){
        let projectIndex = List.getList().allProjects.findIndex(project => project.projectTitle == projectName);
        List.getList().allProjects[projectIndex].isShowProject = isShow;
    }

    getShowOrHideProjectCard(projectName){
        let projectIndex = List.getList().allProjects.findIndex(project => project.projectTitle == projectName);
        let isShow = List.getList().allProjects[projectIndex].isShowProject;
        return isShow;
    }
}

export default new createListDetailsManager();