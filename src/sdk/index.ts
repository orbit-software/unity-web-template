import CryptoSteamSDK from 'crypto-steam-sdk';
import {debug, info} from "../utils/logger";
import {initLaunchAd} from "./ad";

export function getAndInitSDK() {
    info(`start 'CryptoSteamSDK'`)

    initEmuSDK();

    CryptoSteamSDK.initialize();

    return CryptoSteamSDK
}


// todo
export function initEmuSDK() {
    return (window as any).CryptoSteamEmuSDK = {
        isAdRunning: () => { debug('emu isAdRunning'); return false; },
        runAd: () => {debug('emu runAd'); initLaunchAd()},
    }  as CryptoSteamEmuSDK;
}

// todo temp
export interface CryptoSteamEmuSDK {
    isAdRunning: () => boolean
    runAd: () => void
}
