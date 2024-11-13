import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourapp.app',
  appName: 'YourApp',
  webDir: 'www',
  bundledWebRuntime: false,
  // Deshabilitar el modo oscuro en la app móvil
  android: {
    webContentsDebuggingEnabled: true,
    preferences: {
      DarkMode: 'false'
    }
  },
  ios: {
    preferences: {
      DarkMode: 'false'
    }
  }
};

export default config;
