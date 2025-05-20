import {PortalSDK} from "@orbit-software/sdk";

let timer: any

const trackTimeEveryS = 20; // 20 seconds

export function startGameTimeTrack() {
    if (timer) clearInterval(timer);

    PortalSDK.trackGameTimeTick()

    timer = setInterval(() => {
        PortalSDK.trackGameTimeTick()
    }, trackTimeEveryS * 1000)
}

export function stopGameTimeTrack() {
    if (timer) clearInterval(timer);
}