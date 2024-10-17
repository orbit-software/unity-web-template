import CryptoSteamSDK from 'crypto-steam-sdk';
import {info} from "../utils/logger";
import {initLaunchAd} from "./ad";

export async function getAndInitSDK() {
    info(`start 'CryptoSteamSDK'`)

    initLocalSDK();

    await CryptoSteamSDK.initialize();

    return CryptoSteamSDK
}


// todo temp
export function initLocalSDK() {
    return (window as any).CryptoSteamSDKLocal = {
        isAdRunning: () => { return false; },
        runAd: () => {initLaunchAd()}
    }  as ICryptoSteamSDKLocal;
}

// todo temp
export interface ICryptoSteamSDKLocal {
    isAdRunning: () => boolean
    runAd: () => void
}
