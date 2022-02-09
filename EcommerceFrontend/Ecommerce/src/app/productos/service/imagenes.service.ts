import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

import { Imagen } from '../models/imagen';
import { Observable, of } from 'rxjs';
import { firebaseConfig } from 'src/environments/firebaseConfig';

const app = firebase.initializeApp(firebaseConfig.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor() { }

  getImagenPrincipal(id: string): Observable<Imagen[]> {
    let imagenes: Imagen[] = [];
    //Creo la referencia al nodo que quiero recuperar
    var imagenPrincipalRef = firebase
      .database()
      .ref()
      .child(`imagenes/${id}/principal`);
    //Recupero la informacion y la asigno al array de imagenes
    imagenPrincipalRef.on("value", (snapshot) => {
      let data = snapshot.val();
      for (var key in data) {
        let imagen = new Imagen();
        imagen.url = data[key].url;
        imagen.nombre = data[key].nombre;
        imagen.tipo = data[key].tipo;
        imagenes.push(imagen);
      }
    });
    return of(imagenes);
  }

  getImagenesSecundarias(id: string): Observable<Imagen[]> {
    let secundarias: Imagen[] 
    secundarias = [];
    //Creo la referencia al nodo que quiero recuperar
    var imagenesSecundariasRef = firebase
      .database()
      .ref()
      .child(`imagenes/${id}/secundaria`);
    //Recupero la informacion y la asigno al array de imagenes
    let onDataChange = imagenesSecundariasRef.on("value", (snapshot) => {
      let data = snapshot.val();
      for (var key in data) {
        let imagen = new Imagen();
        imagen.url = data[key].url;
        imagen.nombre = data[key].nombre;
        imagen.tipo = data[key].tipo;
        secundarias.push(imagen);
      }
      imagenesSecundariasRef.off("value", onDataChange);
    });
    return of(secundarias);
  }

  subirImagen(file: File, id: string, tipo: string): void {
    let arrayNombre = file.name.split(".");
    //Creo una referencia en el storage
    var storageRef = firebase.storage().ref().child(`imagenes/${id}/${tipo}/${arrayNombre[0]}`);
    //Subir el archivo al storage
    storageRef.put(file).then(data => {
      //Creo una referencia en la base de datos
      var databaseRef = firebase.database().ref().child(`imagenes/${id}/${tipo}/${arrayNombre[0]}`)
      storageRef.getDownloadURL().then((url) => {
        //Con la url del storage introduzco datos en la referencia de la base de datos
        databaseRef.set({
          nombre: file.name,
          url: url,
          tipo: tipo
        });
      })
    });
  }

  //Eliminar una imagen de un producto determinado
  deleteImage(imagen: Imagen, id: string): void {
    console.log("en delete, Imagen: ", imagen, " , id: ", id)
    let nombreSinPunto = imagen.nombre.split(".")[0];
    let imagenRef = firebase
      .database()
      .ref()
      .child(`imagenes/${id}/${imagen.tipo}/${nombreSinPunto}`);
    let imagenStorageRef = firebase
      .storage()
      .ref()
      .child(`imagenes/${id}/${imagen.tipo}/${nombreSinPunto}`);
    imagenRef.remove();
    imagenStorageRef.delete();
  }

  deleteSecundarias(id: string): Observable<string>{
    let nodeRef = firebase.database().ref().child(`imagenes/${id}/secundaria/`);
    nodeRef.remove();
    //Borrado de la carpeta correspondiente en Storage
    this.deleteFolderContents(`imagenes/${id}/secundaria/`);
    let response = new Object();
    return of("response");
  }

  //Metodo para borrar un nodo dela base de datos de Firebase
  deleteNode(id: string): void {
    let nodeRef = firebase.database().ref().child(`imagenes/${id}/`);
    nodeRef.remove();
    //Borrado de la carpeta correspondiente en Storage
    this.deleteFolderContents(`imagenes/${id}/`);
  }

  //Metodo para borrar una carpeta entera del Strorage
  deleteFolderContents(path: string) {
    const ref = firebase.storage().ref(path);
    ref
      .listAll()
      .then((dir) => {
        dir.items.forEach((fileRef) => {
          this.deleteFile(ref.fullPath, fileRef.name);
        });
        dir.prefixes.forEach((folderRef) => {
          this.deleteFolderContents(folderRef.fullPath);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Eliminar un archivo del storage
  deleteFile(pathToFile: string, fileName: string) {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete();
  }
}
