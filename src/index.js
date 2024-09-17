import "./css/css-reset.css";
import "./css/main-layout.css";
import "./css/header.css";
import "./css/navigation.css";
import "./css/content.css";
import { showAllProjectsInNav, showAddNewListDialogBox, 
    loadPageWithDarkOrLightMode, showCreateNewTaskDialog, showProjectCardInContent, 
    showHelpPopup} from "./js/ui/barrel.js";

loadPageWithDarkOrLightMode();
showAllProjectsInNav();
showProjectCardInContent();
showAddNewListDialogBox();
showCreateNewTaskDialog();
showHelpPopup();


