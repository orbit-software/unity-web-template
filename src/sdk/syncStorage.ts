import {log} from "../utils/logger";
import {PortalSDK} from "@orbit-software/sdk";

let timer: any
let pending = {} as Record<string, string>
let state = {} as Record<string, string>


const trackTimeEveryS = 5; // 5 seconds


export function setValueSync(key: string, value: any) {
    state[key] = pending[key] = value;
}

export function removeValueSync(key: string) {
    delete state[key]
    delete pending[key]
    PortalSDK.removeValue(key)
}

export function getValueSync(key: string) {
    return state[key]
}

async function loadAll() {
    state = await PortalSDK.getAllKeyValues()
}


export function startSaveTick() {
    if (timer) clearInterval(timer);

    loadAll();

    timer = setInterval(async () => {
        await savePendingChanges()
    }, trackTimeEveryS * 1000)
}

export function stopSaveTick() {
    if (timer) clearInterval(timer);
}

async function savePendingChanges() {

    const pendingToSave = {...pending};

    log('save pending changes ' + Object.keys(pendingToSave).length);
    console.log(pending);

    for (const key of Object.keys(pendingToSave)) {

        await PortalSDK.setValue(key, pendingToSave[key])
        delete pending[key]
    }
}