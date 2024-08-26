// Loads page with user default OS setting theme and gives ability to change it

export default function loadPageWithDarkOrLightMode() {
    // getting header to add changing icons for dark/light mode
    const header = document.querySelector("header");
    const headerSettings = header.querySelector(".header-settings");
    const lightMode = header.querySelector("svg.feather-sun");
    const darkMode = headerSettings.querySelector("svg.feather-moon");

    // initially remove both buttons till a color scheme is decided
    lightMode.remove();
    darkMode.remove();

    // Getting user preference and adding button to change that option
    if(window.matchMedia("(prefers-color-scheme:dark)").matches){
        headerSettings.appendChild(lightMode);
    }else{
        headerSettings.appendChild(darkMode);
    }

    // changes to light mode
    lightMode.addEventListener("click", ()=>{
        document.documentElement.style.colorScheme = "light";
        lightMode.remove();
        headerSettings.appendChild(darkMode);
    });

    // changes to dark mode
    darkMode.addEventListener("click", ()=>{
        document.documentElement.style.colorScheme = "dark";
        darkMode.remove();
        headerSettings.appendChild(lightMode);
    });
}


