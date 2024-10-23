import {CryptoSteamSDKAd} from "crypto-steam-sdk";


export function isAdActive() {
    const div = document.querySelector('.ad')
    return div!.classList.contains('visible')
}

export function initLaunchAd(data: CryptoSteamSDKAd) {

    const video = document.querySelector('video');
    video!.src = data.url as string;
    video!.play();

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