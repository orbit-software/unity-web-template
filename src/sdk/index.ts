import CryptoSteamSDK from 'crypto-steam-sdk';
import {info} from "../utils/logger";
import {initLaunchAd, isAdActive} from "./ad";
import WebApp from "@twa-dev/sdk";

export function getAndInitSDK() {
    info(`start 'CryptoSteamSDK'`)

    initEmuSDK();
    CryptoSteamSDK.initialize();

    return CryptoSteamSDK
}



export function initEmuSDK() {
    return (window as any).CryptoSteamEmuSDK = {
        isAdRunning: () => {return isAdActive() },
        getStartParam: () => { return WebApp.initDataUnsafe.start_param },
        requestAd: async () => {

            const data = await CryptoSteamSDK.requestAd()
            if(data && data.is_available) {
                initLaunchAd(data)
            }
        },
    }  as CryptoSteamEmuSDK;
}


export interface CryptoSteamEmuSDK {
    isAdRunning: () => boolean
}
