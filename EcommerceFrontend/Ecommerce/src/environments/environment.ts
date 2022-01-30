import { firebase } from "./firebase";

export const environment = {
  production: false,

  title: `E-commerce`,
  urlAPI: `http://localhost:8080/api`,
  urlBack: `http://localhost:8080`,

  
  // firebase
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
  databaseURL: firebase.databaseURL,


};
