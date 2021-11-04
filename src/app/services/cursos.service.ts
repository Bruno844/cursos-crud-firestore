import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurso } from '../models/curso.interface';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  public cursos! : Observable<ICurso[]>; //referencia a la coleccion de cursos
  public collectionCursos!: AngularFirestoreCollection<ICurso>;

  constructor(private firestore: AngularFirestore)//referencia a la base de datos de firebase
  {
    this.collectionCursos = this.firestore.collection<ICurso>('cursos');
    this.obtenerCursos();
  }

  obtenerCursos(){ // el pipe(tuberia) nos permite aplicar operadore como el .map o .filter segun el caso
    this.cursos = this.collectionCursos.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as ICurso))
      //aca estariamos buscando info de los cursos almacenados dentro de mi base de datos
    )
    //cuando haga referencia a 'this.cursos' estaria llamando a todos los cursos que tenga disponibles
  }
  

  obtenerCursoPorId(idCurso: string){
    return this.firestore.collection('cursos').doc(idCurso).snapshotChanges();
  }

  //la DATA toma los valores que le asignemos, en este caso toma los valores de la interfaz ICurso
  actualizarCurso(idCurso:string , data:ICurso){ //le agregamos el data ya que toma todos los valores en caso de que se modifiquen todos o uno solo
    return this.firestore.collection('cursos').doc(idCurso).set(data);
  }

  //recibimos un curso y lo agregamos a nuestra base de datos
  agregarCurso(data:ICurso): Promise<void>{ //aca se tomaria tambien la data, que usariamos todos los valores de un curso(la interfaz y sus variables)
    return new Promise(async (resolve, reject) =>{
      try{
        const id = this.firestore.createId();
        data.id = id;
        const result = await this.collectionCursos?.doc(id).set(data);
        resolve(result)
      } catch(err){
        reject(err);
      }
    })
  }

  eliminarCurso(idCurso: string): Promise<void>{
    return new Promise(async (resolve,reject)=>{
      try{
        const result = await this.collectionCursos?.doc(idCurso).delete();
        resolve(result)
      } catch(err){
        reject(err);
      }
    })
  }



}
