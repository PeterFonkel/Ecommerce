import { firebase } from "./firebase";

export const environment = {
  production: true,

  title: `E-commerce`,
  urlAPI: `https://ecommercepeterfonkel.herokuapp.com/api`,
  urlBack: `https://ecommercepeterfonkel.herokuapp.com`,

  // firebase
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
  databaseURL: firebase.databaseURL,


};

