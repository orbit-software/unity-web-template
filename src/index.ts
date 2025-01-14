import {getAndInitSDK} from "./sdk";
import {debug, error, fatal} from "./utils/logger";
import CryptoSteamSDK, {OverlayConfig, TelegramWebApp} from "crypto-steam-sdk";
import {initOrientationCheck} from "./sdk/orient";
import {initMobileMeta, loadUnity} from "./sdk/loadUnity";

async function main() {
    try {

        // init base
        initMobileMeta()

        // init sdk
        const sdk = await getAndInitSDK()

        // log configs
        debug(`version ${sdk.getVersion()}`)
        debug('config:\n' + JSON.stringify(await sdk.getConfig(), null, 4))
        debug(`profile:\n ${JSON.stringify(await sdk.getProfile(), null, 4)}`);
        debug(`isAdEnabled: ${await sdk.isAdEnabled()}`)

        // init sdk visual elements
        sdk.initializeOverlay({
            onOverlayOpen: () => { debug("overlay open") },
            onOverlayClose: () => { debug("overlay close") }
        } as OverlayConfig)


        // ad
        if (await sdk.isAdEnabled()) {

            try {
                await CryptoSteamSDK.requestAd()
            }
            catch(ex) {
                error(ex)
            }
        }

        // load game
        await loadUnity()

        const config = await sdk.getConfig()

        // // orientation
        // if(config.supported_screen_formats.includes('landscape') && !config.supported_screen_formats.includes('portrait'))
        // {
        //     initOrientationCheck()
        // }

        // lock orientation
        if(config.supported_screen_formats.length === 1) {
            TelegramWebApp.lockOrientation()
        }

    }
    catch(ex) {
        fatal(ex)
    }
}

main().then(() => {});