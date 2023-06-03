import { ElectronAPI } from '@electron-toolkit/preload';
import { APIType } from './';

declare global {
    interface Window {
        electron: ElectronAPI;
        api: APIType;
    }
}
