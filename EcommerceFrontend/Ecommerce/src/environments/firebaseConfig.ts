import { environment } from "./environment";

export const firebaseConfig = {
  firebaseConfig : {
    apiKey: environment.apiKey,
    authDomain: environment.authDomain,
    projectId: environment.projectId,
    storageBucket: environment.storageBucket,
    messagingSenderId: environment.messagingSenderId,
    appId: environment.appId,
    databaseURL: environment.databaseURL,
  },
};
