import {fatal, info} from "../utils/logger";
import {startGameTimeTrack, stopGameTimeTrack} from "./gameTime";
import {startSaveTick, stopSaveTick} from "./syncStorage";
import CryptoSteamSDK from "crypto-steam-sdk";

export function initMobileMeta() {
    info("init mobile meta tag")
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
}

export function loadUnity() : Promise<void> {
    return new Promise(((resolve, reject) => {

        const unity = (window as any) as UnityScripts

        const container = document.querySelector("#cs-unity-container") as HTMLElement;
        const canvas = document.querySelector("#cs-unity-canvas") as HTMLCanvasElement;
        const loadingBar = document.querySelector("#cs-unity-loading-bar") as HTMLElement;
        const progressBarFull = document.querySelector("#cs-unity-progress-bar-full") as HTMLElement;

        loadingBar.style.display = "block";

        startSaveTick()

        const script = document.createElement("script");
        script.src = unity.unityConfig.loaderUrl;
        script.onload = () => {

            unity.createUnityInstance(canvas, (window as any).unityConfig,
                (progress:number) => progressBarFull.style.width = 100 * progress + "%")
                .then((unityInstance) => {
                    info('!!! UnityInstance loaded');
                    CryptoSteamSDK.gameReady()
                    startGameTimeTrack()
                    resolve()
                    loadingBar.style.display = "none";
                }).catch((message) => {
                    stopGameTimeTrack()
                    stopSaveTick()
                    fatal(message);
                    reject()
                });
        };
        document.body.appendChild(script);

    }));
}

interface UnityConfig {
    arguments: any[];
    loaderUrl: string
    dataUrl: string
    frameworkUrl: string
    workerUrl: string
    codeUrl: string
    symbolsUrl: string
    streamingAssetsUrl: string
    companyName: string
    productName: string
    productVersion: string
}

interface UnityInstance {

}

export interface UnityScripts {
    createUnityInstance: (canvas: HTMLCanvasElement, config: UnityConfig, onProgress: (progress:number) => void ) => Promise<UnityInstance>;
    unityConfig: UnityConfig
}
