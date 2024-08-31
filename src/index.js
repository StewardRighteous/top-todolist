import "./css/css-reset.css";
import "./css/homepage.css";
import { showAllProjectsInNav, showAddNewListDialogBox, loadPageWithDarkOrLightMode, showCreateNewTaskDialog } from "./js/ui/barrel.js";

loadPageWithDarkOrLightMode();
showAllProjectsInNav();
showAddNewListDialogBox();
showCreateNewTaskDialog();


