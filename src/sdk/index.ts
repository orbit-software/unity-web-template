import CryptoSteamSDK, {TelegramWebApp} from 'crypto-steam-sdk';
import {info} from "../utils/logger";
import {initLaunchAd, isAdActive} from "./ad";

export function getAndInitSDK() {
    info(`start 'CryptoSteamSDK'`)

    initEmuSDK();
    CryptoSteamSDK.initialize();

    return CryptoSteamSDK
}

export function initEmuSDK() {
    return (window as any).CryptoSteamEmuSDK = {
        isAdRunning: () => {return isAdActive() },
        getStartParam: () => {
            const startParam = TelegramWebApp.initDataUnsafe.start_param
            return startParam ? startParam : "";
        },
        requestAd: async () => {
            await CryptoSteamSDK.requestAd()
            // if(data && data.is_available) {
            //     //initLaunchAd(data)
            // }
        },
    }  as CryptoSteamEmuSDK;
}


export interface CryptoSteamEmuSDK {
    isAdRunning: () => boolean
}
