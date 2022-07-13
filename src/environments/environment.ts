// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB5Pr3VpKDC255Wgk6OBZEbd0qU8nRCNJI",
    authDomain: "dypchatbot.firebaseapp.com",
    projectId: "dypchatbot",
    storageBucket: "dypchatbot.appspot.com",
    messagingSenderId: "555398659786",
    appId: "1:555398659786:web:efadf4240ec167949dfe33",
    measurementId: "G-G60327M1HG",
  },
  dialogflow: {
    angularBot: "AIzaSyB5Pr3VpKDC255Wgk6OBZEbd0qU8nRCNJI",
  },
  localhostIP: "https://salty-depths-03445.herokuapp.com/",
  //http://4697bbed4253.ngrok.io
};
// export const environment = {
//   production: false,
// };
export default environment.firebaseConfig;
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
