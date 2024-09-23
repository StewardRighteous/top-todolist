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

loadPageWithDarkOrLightMode();
showAllProjectsInNav();
showProjectCardInContent();
showAddNewListDialogBox();
showCreateNewTaskDialog();
showHelpPopup();
showUserOptionsPopup();

// Show all projects when clicked on all Tasks
const navigation = document.querySelector("nav");
const sectionButtons = navigation.querySelector(".section-buttons");
const allTasksButton = sectionButtons.querySelector("#all-tasks");
const starredTasksButton = sectionButtons.querySelector("#starred-tasks");

allTasksButton.style.backgroundColor = "var(--secondary)";
allTasksButton.addEventListener("click", () => {
    showProjectCardInContent();
    allTasksButton.style.backgroundColor = "var(--secondary)";
    starredTasksButton.style.backgroundColor = "var(--background)";
});

// Show all starred tasks when clicked on starred tasks button
starredTasksButton.addEventListener("click", () => {
    showStarredCard();
    starredTasksButton.style.backgroundColor = "var(--secondary)";
    allTasksButton.style.backgroundColor = "var(--background)";
});



