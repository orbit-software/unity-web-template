import {getAndInitSDK} from "./sdk";
import {debug, fatal} from "./utils/logger";
import {initLaunchAd} from "./sdk/ad";
import CryptoSteamSDK, {OverlayConfig} from "crypto-steam-sdk";
import {initOrientationCheck} from "./utils/orient";
import {initMobileMeta, loadUnity} from "./utils/loadUnity";

async function main() {
    try {

        // init base
        initMobileMeta()

        // init sdk
        const sdk = getAndInitSDK()

        // log configs
        debug(`version ${sdk.getVersion()}`)
        debug('config:\n' + JSON.stringify(sdk.getConfig(), null, 4))
        debug(`profile:\n ${JSON.stringify(await sdk.getProfile(), null, 4)}`);
        debug(`isAdEnabled: ${await sdk.isAdEnabled()}`)

        // init sdk visual elements
        sdk.initializeOverlay({
            onOverlayOpen: () => { debug("overlay open") },
            onOverlayClose: () => { debug("overlay close") }
        } as OverlayConfig)

        // orientation
        initOrientationCheck()

        // ad
        if (await sdk.isAdEnabled()) {
            const data = await CryptoSteamSDK.requestAd()
            if(data && data.is_available) {
                initLaunchAd(data)
            }
        }

        // load game (unity)
        loadUnity()
    }
    catch(ex) {
        fatal(ex)
    }
}

main().then(() => {});