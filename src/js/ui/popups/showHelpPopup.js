// Explains what the website is about when clicked on help icon
export default function showHelpPopup(){
    // getting help icon
    const header = document.querySelector("header");
    const headerSettings = header.querySelector(".header-settings");
    const helpIcon = headerSettings.querySelector("svg.feather-help-circle");

    const helpPopup = document.createElement("dialog");
    const helpMessage = document.createElement("p");
    helpMessage.textContent =  `This is a mockup app of Google Tasks. In order to create and store tasks, use the Create Task Button.
        You can add your tasks to your default project, Or you can create your own project by adding new list. Each task or todo will
        be on its own project with its editing options. `

    const popupCloseButton = document.createElement("button");
    popupCloseButton.textContent = "close";

    helpPopup.append(helpMessage, popupCloseButton);
    headerSettings.appendChild(helpPopup); 

    helpIcon.addEventListener("click", ()=>{
        // Showing popup under the help icon
        const helpIconDImensions = helpIcon.getBoundingClientRect();
        helpPopup.style.top = `${helpIconDImensions.y + 30}px`;
        helpPopup.style.left = `${helpIconDImensions.x - 250}px`;
        helpPopup.show();
    });

    popupCloseButton.addEventListener("click", ()=>{
        helpPopup.close();
    });
}