import CryptoSteamSDK from 'crypto-steam-sdk';

import {ICryptoSteamSDKLocal} from "./types";
import {info} from "../utils/logger";
import {sdkName} from "../consts";
import {initLaunchAd} from "./ad";

export async function getAndInitSDK() {
    info(`start '${sdkName}'`)

    initLocalSDK();

    await CryptoSteamSDK.initialize();

    return CryptoSteamSDK
}


export function initLocalSDK() {
    return (window as any).CryptoSteamSDKLocal = {
        isAdRunning: () => { return false; },
        runAd: () => {initLaunchAd()}
    }  as ICryptoSteamSDKLocal;
}
