// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endPoint: 'https://api.coincap.io/',
  version: 'v2/',
  firebaseConfig: {
    apiKey: 'AIzaSyDbcUAKKRUCVh418P_MViaRaHfyMByNwyc',
    authDomain: 'auth-project-951b7.firebaseapp.com',
    databaseURL: 'https://auth-project-951b7.firebaseio.com',
    projectId: 'auth-project-951b7',
    storageBucket: 'auth-project-951b7.appspot.com',
    messagingSenderId: '539228003694',
    appId: '1:539228003694:web:c7a89597b8297fe671f57f',
    measurementId: 'G-NM58J16Q9R',
  },
  cacheSize: 1,
  refreshInterval: 60 * 60 * 1000,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
