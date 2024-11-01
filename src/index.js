import "./css/css-reset.css";
import "./css/main-layout.css";
import "./css/header.css";
import "./css/navigation.css";
import "./css/content.css";
import {
    showAllProjectsInNav,
    showAddNewListDialogBox,
    loadPageWithDarkOrLightMode,
    showCreateNewTaskDialog,
    showProjectCardInContent,
    showHelpPopup,
    showUserOptionsPopup,
    showStarredCard
} from "./js/ui/barrel.js";
import { StorageManager } from "./js/manager/barrel.js";

loadPageWithDarkOrLightMode();
showAllProjectsInNav();
showProjectCardInContent();
showAddNewListDialogBox();
showCreateNewTaskDialog();
showHelpPopup();
showUserOptionsPopup();
StorageManager.subscribeStorageToChanges();
StorageManager.getFromLocal();

// Show all projects when clicked on all Tasks
const navigation = document.querySelector("nav");
const sectionButtons = navigation.querySelector(".section-buttons");
const allTasksButton = sectionButtons.querySelector("#all-tasks");
const starredTasksButton = sectionButtons.querySelector("#starred-tasks");

allTasksButton.style.backgroundColor = "var(--secondary)";
allTasksButton.addEventListener("click", () => {
    showProjectCardInContent();
});

// Show all starred tasks when clicked on starred tasks button
starredTasksButton.addEventListener("click", () => {
    showStarredCard();
});



