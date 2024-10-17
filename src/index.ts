import {getAndInitSDK} from "./sdk";
import {debug, fatal} from "./utils/logger";
import {initLaunchAd} from "./sdk/ad";

async function main() {
    try {
        const sdk = await getAndInitSDK()

        // log configs
        debug(`version ${sdk.getVersion()}`)
        debug('config:\n' + JSON.stringify(sdk.getConfig(), null, 4))

        // init launch ad
        if (await sdk.isAdEnabled()) {
            initLaunchAd()
        }

        // init profile ??

        // init achievements ??

        // init something else ???

    }
    catch(ex) {
        fatal(ex)
    }
}

main().then(() => {});