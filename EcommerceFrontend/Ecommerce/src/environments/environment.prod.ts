import { firebase } from "./firebase";

export const environment = {
  production: true,

  title: `E-commerce`,
  urlAPI: `urlAPI`,
  urlBack: `urlBAck`,

  // firebase
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
  databaseURL: firebase.databaseURL,


};

