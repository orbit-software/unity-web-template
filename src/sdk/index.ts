import {ICryptoSteamSDK} from "./types";
import {debug, info} from "../utils/logger";
import {sdkName} from "../consts";
import WebApp from "@twa-dev/sdk";

export function getAndInitSDK() {
    info(`start '${sdkName}'`)

    const sdk = getSDK()

    if(sdk === null) {
        throw new Error(`SDK ${sdkName} not found`);
    }

    // init telegram
    debug(`init telegram WebApp...`)
    WebApp.ready();
    WebApp.expand();

    if(WebApp.initData === '' || WebApp.initData === null) {
        throw new Error(`telegram WebApp.initData not found`);
    }

    // todo ?
    const gameId = "1"

    debug(`init SDK...`)
    sdk.initialize({id: gameId, initData: WebApp.initData})

    return sdk
}


export function getSDK() {
    return ((window as any).CryptoSteamSDK as ICryptoSteamSDK);
}
