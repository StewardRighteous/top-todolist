// It will show a popup that will display user name and logout options on user icon click
export default function showUserOptionsPopup() {
    // Getting user icon
    const header = document.querySelector("header");
    const headerSettings = header.querySelector(".header-settings");
    const userIcon = headerSettings.querySelector("svg.feather-user");

    // User popup
    const userOptionsPopup = document.createElement("dialog");
    const userName = document.createElement("h1");
    userName.textContent = "User Name 1";
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.style.backgroundColor = "#DE2128";
    logoutButton.style.color = "white";
    const popupCloseButton = document.createElement("button");
    popupCloseButton.textContent = "close";

    userOptionsPopup.append(userName, logoutButton, popupCloseButton);
    headerSettings.appendChild(userOptionsPopup);

    // Close pop up when clicked outside of it
    userOptionsPopup.addEventListener("click", (e)=>{
        const userOptionsPopupDimensions = userOptionsPopup.getBoundingClientRect();
        if (e.clientX < userOptionsPopupDimensions.left ||
            e.clientX > userOptionsPopupDimensions.right ||
            e.clientY < userOptionsPopupDimensions.top ||
            e.clientY > userOptionsPopupDimensions.bottom
        ) {
            userOptionsPopup.close();
        }
    });

    userIcon.addEventListener("click", (e) => {
        // showing dialog near user icon
        const userIconDimensions = userIcon.getBoundingClientRect();
        userOptionsPopup.style.top = `${userIconDimensions.y + 30}px`;
        userOptionsPopup.style.left = `${userIconDimensions.x - 250}px`;
        userOptionsPopup.showModal();
    });

    popupCloseButton.addEventListener("click", () => {
        userOptionsPopup.close();
    });
}