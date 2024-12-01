export function log(message?: any, ...optionalParams: any[]) {
    console.log(`[DEBUG] ${message}`, optionalParams)
}
export function debug(message?: any, ...optionalParams: any[]) {
    log(message, ...optionalParams)
}

export function info(message?: any, ...optionalParams: any[]) {
    console.log(`[INFO] ${message}`, optionalParams)
}

export function error(message?: any, ...optionalParams: any[]) {
    console.error(`[ERROR] ${message}`, optionalParams)
}

export function fatal(message?: any, ...optionalParams: any[]) {
    console.error(`[FATAL] ${message}`, optionalParams)
}