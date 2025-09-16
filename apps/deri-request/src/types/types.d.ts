import type { AxiosInstance } from 'axios';

declare global {
  interface Window {
    isApp: boolean;
    isCapacitor: boolean;
    baseURL: string;
    router?: any;
    CapacitorPreferences: any;
    tokenIntervalID: any;
    axiosInstance: AxiosInstance;
    _rt: any;
  }
}
