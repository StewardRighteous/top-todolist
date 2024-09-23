// This will return a starred card that will have only starred tasks
import { listDetailsManager } from "../manager/barrel";

export default function showStarredCard(){
        // getting content area
    const contentArea = document.querySelector("#content");

    function removeProjectCardsFromContent() {
        while (contentArea.children.length != 0) {
            contentArea.firstChild.remove();
        }
    }

    removeProjectCardsFromContent();

    if(listDetailsManager.getAllStarredTasksFromAllProjects().length == 0){
        const starredMessageContainer = document.createElement("div");
        const noStarredTasksMessage = document.createElement("h1");
        noStarredTasksMessage.textContent = "No Starred Tasks. Click on Starred button in project tasks to add Starred Tasks.";
        starredMessageContainer.className = "no-starred-tasks";
        starredMessageContainer.appendChild(noStarredTasksMessage);
        contentArea.appendChild(starredMessageContainer);
    }

    for (let starredTask in listDetailsManager.getAllStarredTasksFromAllProjects()){

    }
}