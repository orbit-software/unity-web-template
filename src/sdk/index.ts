import CryptoSteamSDK, {TelegramWebApp} from 'crypto-steam-sdk';
import {info} from "../utils/logger";
import {getValueSync, removeValueSync, setValueSync} from "./syncStorage";

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

    return (window as any).PortalEmuSDK = {
        isAdRunning: () =>{return false; },
        getValueSync: (key: string) => {
            return getValueSync(key)
        },
        setValueSync: (key: string, value: string) => {
            setValueSync(key, value);
        },
        removeValueSync: async (key: string) => {
            removeValueSync(key)
        },
        reloadAd: () => { (window as any).TMANetwork.reloadAd() },
        getStartParam: () => {
            const startParam = TelegramWebApp.initDataUnsafe.start_param
            return startParam ? startParam : "";
        },
        requestAd: async () => {
            await CryptoSteamSDK.requestAd()
        },
    }  as PortalEmuSDK;
}


export interface PortalEmuSDK {
    isAdRunning: () => boolean
    reloadAd: () => void
}

export interface StartupConfig {
    isFullscreen: boolean
    overlayPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}