export default function loadPageWithDarkOrLightMode() {
    // getting darkmode icon
    const header = document.querySelector("header");
    const headerSettings = header.querySelector(".header-settings");
    const lightMode = header.querySelector("svg.feather-sun");
    const darkMode = headerSettings.querySelector("svg.feather-moon");

    lightMode.remove();
    darkMode.remove();

    if(window.matchMedia("(prefers-color-scheme:dark)").matches){
        headerSettings.appendChild(lightMode);
    }else{
        headerSettings.appendChild(darkMode);
    }

    lightMode.addEventListener("click", ()=>{
        document.documentElement.style.colorScheme = "light";
        lightMode.remove();
        headerSettings.appendChild(darkMode);
    });

    darkMode.addEventListener("click", ()=>{
        document.documentElement.style.colorScheme = "dark";
        darkMode.remove();
        headerSettings.appendChild(lightMode);
    });
}


