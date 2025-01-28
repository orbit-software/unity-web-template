import {getAndInitSDK} from "./sdk";
import {debug, error, fatal} from "./utils/logger";
import CryptoSteamSDK, {OverlayConfig, TelegramWebApp} from "crypto-steam-sdk";
import {initOrientationCheck} from "./sdk/orient";
import {initMobileMeta, loadUnity} from "./sdk/loadUnity";
import {isMobile} from 'react-device-detect';

async function main() {
    try {

        // start fullscreen
        if(isMobile) {
            TelegramWebApp.setHeaderColor("#000")
            TelegramWebApp.setBackgroundColor("#000")
            TelegramWebApp.requestFullscreen()
        }

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

        const config = await sdk.getConfig()

        // ad
        if (await sdk.isAdEnabled()) {

            try {
                await CryptoSteamSDK.requestAd()
            }
            catch(ex) {
                error(ex)
            }
        }


        // orientation
        if(config.supported_screen_formats.includes('landscape') && !config.supported_screen_formats.includes('portrait'))
        {
            initOrientationCheck()
        }

        // load game
        await loadUnity()

    }
    catch(ex) {
        fatal(ex)
    }
}

main().then(() => {});