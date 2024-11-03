import {fatal, info} from "./logger";

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

export function loadUnity() {

    const unity = (window as any) as UnityScripts

    const container = document.querySelector("#unity-container") as HTMLElement;
    const canvas = document.querySelector("#unity-canvas") as HTMLCanvasElement;
    const loadingBar = document.querySelector("#unity-loading-bar") as HTMLElement;
    const progressBarFull = document.querySelector("#unity-progress-bar-full") as HTMLElement;

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = unity.unityConfig.loaderUrl;
    script.onload = () => {

        unity.createUnityInstance(canvas, (window as any).unityConfig,
            (progress:number) => progressBarFull.style.width = 100 * progress + "%")
        .then((unityInstance) => {
            loadingBar.style.display = "none";
        }).catch((message) => {
            fatal(message);
            alert(message);
        });
    };
    document.body.appendChild(script);

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

interface UnityScripts {
    createUnityInstance: (canvas: HTMLCanvasElement, config: UnityConfig, onProgress: (progress:number) => void ) => Promise<UnityInstance>;
    unityConfig: UnityConfig
}
