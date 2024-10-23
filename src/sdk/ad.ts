import {CryptoSteamSDKAd, CryptoSteamSDKAdMediaType} from "crypto-steam-sdk";


export function isAdActive() {
    const div = document.querySelector('.ad')
    return div!.classList.contains('visible')
}

export function initLaunchAd(data: CryptoSteamSDKAd) {

    const video = document.querySelector('.ad video') as HTMLVideoElement;
    const image = document.querySelector('.ad img') as HTMLImageElement;

    video!.classList.remove('visible')
    image!.classList.remove('visible')

    if(data.mediaType === CryptoSteamSDKAdMediaType.Video) {
        video!.classList.add('visible')
        video!.src = data.url as string;
        video!.play();
    }
    else {
        image!.src = data.url as string;
        image!.classList.add('visible')
    }

    const div = document.querySelector('.ad')
    div!.classList.add('visible')

    let timer = data.durationS as number;

    const time = document.querySelector('.time')

    time!.addEventListener('click', () => {
        if(timer <= 0) {
            div!.classList.remove('visible')
        }
    })

    time!.textContent = timer.toString()

    const interval = setInterval(() => {
        timer -= 1
        time!.textContent = timer.toString()
        if(timer <= 0) {
            time!.textContent = '✕';
            clearInterval(interval)
        }
    }, 1000)
}