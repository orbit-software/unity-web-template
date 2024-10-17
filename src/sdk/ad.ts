

export function initLaunchAd() {

    const div = document.querySelector('.ad')
    div!.classList.add('visible')

    const time = document.querySelector('.time')

    let timer = 5

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