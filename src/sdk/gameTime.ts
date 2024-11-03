import CryptoSteamSDK from "crypto-steam-sdk";

let timer: any

const trackTimeEveryS = 20; // 20 seconds

export function startGameTimeTrack() {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        CryptoSteamSDK.trackGameTimeTick()
    }, trackTimeEveryS * 1000)
}

export function stopGameTimeTrack() {
    if (timer) clearInterval(timer);
}