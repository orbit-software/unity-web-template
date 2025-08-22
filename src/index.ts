import {getAndInitSDK} from "./sdk";
import {debug, error, fatal} from "./utils/logger";
import {PortalSDK} from "@orbit-software/sdk";
import {initOrientationCheck} from "./sdk/orient";
import {initMobileMeta, loadUnity, UnityScripts} from "./sdk/loadUnity";
import {startSaveTick} from "./sdk/syncStorage";

async function main() {
    try {

        // init base
        initMobileMeta()

        // init sdk
        const sdk = await getAndInitSDK()

        // log configs
        debug(`version ${sdk.getVersion()}`)
        debug('config:\n' + JSON.stringify(await sdk.getConfig(), null, 4))
        debug(`isAdEnabled: ${await sdk.isAdEnabled()}`)

        // init sdk visual elements
        sdk.initializeOverlay()

        const config = await sdk.getConfig()

        // ad
        if (await sdk.isAdEnabled()) {

            try {
                await PortalSDK.requestAd()
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

        startSaveTick()

        // load unity
        const unity = (window as any) as UnityScripts
        if(unity && unity.unityConfig) {
            await loadUnity()
        }

        // or run other game engine
        if((window as any).runGame) {
            (window as any).runGame();
        }


    }
    catch(ex) {
        fatal(ex)
    }
}

main().then(() => {});