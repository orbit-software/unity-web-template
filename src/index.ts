import WebApp from '@twa-dev/sdk';
import {getAndInitSDK} from "./sdk";
import {debug, fatal} from "./utils/logger";
import {initLaunchAd} from "./sdk/ad";

try {
    const sdk = getAndInitSDK()

    // log configs
    debug(`version ${sdk.getVersion()}`)
    debug(`isAdEnabled ${sdk.isAdEnabled()}`)
    debug('config:\n' + JSON.stringify(sdk.getConfig(), null, 4))
    debug('WebApp.initData:\n' + JSON.stringify(WebApp.initData, null, 4))

    // init launch ad
    if (sdk.isAdEnabled()) {
        initLaunchAd()
    }

    // init profile ??

    // init something else ???

}
catch(ex) {
    fatal(ex)
}