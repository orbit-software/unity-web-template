import {info} from "../utils/logger";

let timer: any

export function initOrientationCheck() {
    info("init orientation check")
    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("load", checkOrientation)
}

function checkOrientation() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        const gifContainer = document.getElementById("orientation-gif-container") as HTMLElement;
        const gif = document.getElementById("orientation-gif") as HTMLElement;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (window.innerWidth < window.innerHeight && isMobile) {
            gifContainer.style.display = "flex";
            gif.style.display = "block";
        } else {
            gifContainer.style.display = "none";
            gif.style.display = "none";
        }

    }, 1000);
}