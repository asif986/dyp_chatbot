// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyAe3sQ-06-iLdmUqmVk1vH2--emWt_Uauo",
    authDomain: "college-chatbot-bfek.firebaseapp.com",
    projectId: "college-chatbot-bfek",
    storageBucket: "college-chatbot-bfek.appspot.com",
    messagingSenderId: "228684971887",
    appId: "1:228684971887:web:f9c7478ddaa5cf8f71f29a",
    measurementId: "G-BVP59NMY7L"
  },
  dialogflow: {
    angularBot: 'AIzaSyB5Pr3VpKDC255Wgk6OBZEbd0qU8nRCNJI'
  },
  localhostIP:"http://192.168.1.13:5000"
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
