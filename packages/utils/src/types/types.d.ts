declare global {
  interface Window {
    getDataAsync: (
      url: string,
      type: string,
      data: any,
      sucCallbackFunc: (data: any) => void,
      errCallbackFunc: (error: any) => void,
    ) => void;
    FrameSGHost: string;
    currentUser?: UserForWebUI;
    domain: string;
  }
}

export * from '../utils/index';
