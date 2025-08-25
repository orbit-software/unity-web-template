import {PortalSDK} from '@orbit-software/sdk';
import {getValueSync, removeValueSync, setValueSync} from "./syncStorage";

export async function getAndInitSDK() {
    initEmuSDK();

    await PortalSDK.initialize();

    return PortalSDK
}

export function initEmuSDK() {

    return (window as any).PortalEmuSDK = {
        isAdRunning: () =>{ /* obsolete */ return false; },

        getValueSync: (key: string) => {
            return getValueSync(key)
        },

        setValueSync: (key: string, value: string) => {
            setValueSync(key, value);
        },

        removeValueSync: async (key: string) => {
            removeValueSync(key)
        },

        reloadAd: () => { /* obsolete */ },

        getStartParam: () => {
            // @ts-ignore
            const startParam = window.Telegram.WebApp.initDataUnsafe.start_param
            return startParam ? startParam : "";
        },

        requestAd: async () => {
            /* obsolete */
            await PortalSDK.requestAd()
        },
    }  as PortalEmuSDK;
}


export interface PortalEmuSDK {
    isAdRunning: () => boolean
    reloadAd: () => void
}