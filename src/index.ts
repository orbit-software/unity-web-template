import {getAndInitSDK} from "./sdk";
import {debug, fatal} from "./utils/logger";
import {initLaunchAd} from "./sdk/ad";
import CryptoSteamSDK, {OverlayConfig} from "crypto-steam-sdk";

async function main() {
    try {
        const sdk = getAndInitSDK()

        // log configs
        debug(`version ${sdk.getVersion()}`)
        debug('config:\n' + JSON.stringify(sdk.getConfig(), null, 4))
        debug(`profile:\n ${JSON.stringify(await sdk.getProfile(), null, 4)}`);
        debug(`isAdEnabled: ${await sdk.isAdEnabled()}`)

        // init launch ad
        if (await sdk.isAdEnabled()) {

            const data = await CryptoSteamSDK.requestAd()

            if(data && data.is_available) {
                initLaunchAd(data)
            }
        }

        sdk.initializeOverlay({
            onOverlayOpen: () => { debug("overlay open") },
            onOverlayClose: () => { debug("overlay close") }
        } as OverlayConfig)

        // init profile ??

        // init achievements ??

        // init something else ???

    }
    catch(ex) {
        fatal(ex)
    }
}

main().then(() => {});