import CryptoSteamSDK, {TelegramWebApp} from 'crypto-steam-sdk';
import {info} from "../utils/logger";
import {getValueSync, setValueSync} from "./syncStorage";

export function getStartupConfig() {
    return (window as any).startupConfig as StartupConfig
}
export async function getAndInitSDK() {
    info(`start 'CryptoSteamSDK'`)

    initEmuSDK();

    await CryptoSteamSDK.initialize();

    return CryptoSteamSDK
}

export function initEmuSDK() {

    return (window as any).CryptoSteamEmuSDK = {
        isAdRunning: () =>{return false; },
        getValueSync: (key: string) => {
            return getValueSync(key)
        },
        setValueSync: (key: string, value: string) => {
            setValueSync(key, value);
        },
        reloadAd: () => { (window as any).TMANetwork.reloadAd() },
        getStartParam: () => {
            const startParam = TelegramWebApp.initDataUnsafe.start_param
            return startParam ? startParam : "";
        },
        requestAd: async () => {
            await CryptoSteamSDK.requestAd()
        },
    }  as CryptoSteamEmuSDK;
}


export interface CryptoSteamEmuSDK {
    isAdRunning: () => boolean
    reloadAd: () => void
}

export interface StartupConfig {
    isFullscreen: boolean
    overlayPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}