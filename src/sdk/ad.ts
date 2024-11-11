import {CryptoSteamSDKAd, CryptoSteamSDKAdMediaType} from "crypto-steam-sdk";

export function isAdActive() {
    const div = document.querySelector('#sdk-ad')
    return div!.classList.contains(classVis)
}

export function initLaunchAd(data: CryptoSteamSDKAd) : Promise<void> {
    return new Promise<void>((resolve, reject) => {

        function onLoad() {

            try {

                const div = document.querySelector('#sdk-ad') as HTMLElement
                div.classList.add(classVis)

                // @ts-ignore
                let timer = Math.round(data.duration as number);

                const time = document.querySelector('#sdk-ad .time') as HTMLElement

                time.addEventListener('click', () => {
                    if (timer <= 0) {
                        div.classList.remove(classVis)
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
            catch (e) {
                console.error(e)
                reject(e)
            }
        }

        try {
            const video = document.querySelector('#sdk-ad video') as HTMLVideoElement;
            const image = document.querySelector('#sdk-ad img') as HTMLImageElement;

            video.classList.remove(classVis)
            image.classList.remove(classVis)

            // @ts-ignore
            if (data.media_type === CryptoSteamSDKAdMediaType.Video) {
                video.classList.add(classVis)
                video.onload = onLoad;
                video.src = data.url as string;
                video.play();
                onLoad()
            } else {
                image.classList.add(classVis)
                image.onload = onLoad
                image.src = data.url as string;
                onLoad()
            }
        }
        catch (e) {
            console.error(e)
            reject(e)
        }

    })
}

const classVis = 'sdk-visible'