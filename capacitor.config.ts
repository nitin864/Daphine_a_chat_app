import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daphine.app',
  appName: 'Daphine',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
