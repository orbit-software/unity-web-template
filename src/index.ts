import {getAndInitSDK} from "./sdk";
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

        // init sdk visual elements
        sdk.initializeOverlay()

        const config = await sdk.getConfig()

        // ad
        if (await sdk.isAdEnabled()) {

            try {
                await PortalSDK.requestAd()
            }
            catch(ex) {
                console.error(ex)
            }
        }

        // orientation
        if(config.supported_screen_formats.includes('landscape') &&
            !config.supported_screen_formats.includes('portrait'))
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
        console.error(ex)
    }
}

main().then(() => {});