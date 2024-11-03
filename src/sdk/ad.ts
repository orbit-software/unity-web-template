import {CryptoSteamSDKAd, CryptoSteamSDKAdMediaType} from "crypto-steam-sdk";

export function isAdActive() {
    const div = document.querySelector('#sdk-ad')
    return div!.classList.contains(classVis)
}

export function initLaunchAd(data: CryptoSteamSDKAd) : Promise<void> {
    return new Promise<void>((resolve, reject) => {

        const video = document.querySelector('#sdk-ad video') as HTMLVideoElement;
        const image = document.querySelector('#sdk-ad img') as HTMLImageElement;

        video.classList.remove(classVis)
        image.classList.remove(classVis)

        if (data.mediaType === CryptoSteamSDKAdMediaType.Video) {
            video.classList.add(classVis)
            video.onload = onLoad;
            video.src = data.url as string;
            video.play();
        }
        else {
            image.onload = onLoad
            image.src = data.url as string;
            image.classList.add(classVis)
        }

        function onLoad() {

            const div = document.querySelector('#sdk-ad') as HTMLElement
            div.classList.add(classVis)

            let timer = data.durationS as number;

            const time = document.querySelector('#sdk-ad .time') as HTMLElement

            time.addEventListener('click', () => {
                if (timer <= 0) {
                    div!.classList.remove(classVis)
                }
            })

            time.textContent = timer.toString()

            const interval = setInterval(() => {
                timer -= 1
                time.textContent = timer.toString()
                if (timer <= 0) {
                    time.textContent = '✕';
                    clearInterval(interval)
                }
            }, 1000)

            resolve()
        }

    })
}

const classVis = 'sdk-visible'