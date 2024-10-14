export interface ICryptoSteamSDKConfig {
    orientation: string;
    supportedDevices: string[];
}

export interface ICryptoSteamSDKProfile {
    id: string;
    name: string;
    avatar: string;
}

export interface ICryptoSteamSDK {
    initialize: ( {} ) => void;
    getConfig: () => { config: ICryptoSteamSDKConfig; };
    createReceipt: () => string;
    isAdEnabled: () => boolean;
    getProfile: () => { profile: ICryptoSteamSDKProfile };
    trackLaunch: () => void;
    getVersion: () => string;
    isAdRunning: () => boolean
    runAd: () => void
}

export interface ICryptoSteamSDKLocal {
    isAdRunning: () => boolean
    runAd: () => void
}