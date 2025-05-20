import {PortalSDK} from '@orbit-software/sdk';
import {info} from "../utils/logger";
import {getValueSync, removeValueSync, setValueSync} from "./syncStorage";

export function getStartupConfig() {
    return (window as any).startupConfig as StartupConfig
}
export async function getAndInitSDK() {
    info(`start 'PortalSDK'`)

    initEmuSDK();

    await PortalSDK.initialize();

    return PortalSDK
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
            // @ts-ignore
            const startParam = window.Telegram.WebApp.initDataUnsafe.start_param
            return startParam ? startParam : "";
        },
        requestAd: async () => {
            await PortalSDK.requestAd()
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