import { Component, OnInit } from '@angular/core';
import { ICurso } from 'src/app/models/curso.interface';
import { CursosService } from 'src/app/services/cursos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Observable } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cursos : ICurso[] = [];

  public cursoForm!: FormGroup;
  pupLoad! : Observable<number|undefined>
  urlImage!: Observable<string>

  constructor(
      private cursosService: CursosService,
      private fb: FormBuilder,
      private storage : AngularFireStorage 
    ) { 
      this.cursoForm = fb.group({
        nombre: ['', Validators.required],
        descripcion: ['no tiene descripcion', Validators.required],
        imagen: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.cursosService.cursos
    .subscribe(res => {
      this.cursos = res;
    })
    //lo que hace esta funcion es que lo que me traigas del cursoService, almacenamelo en this.cursos con el res(que significa response,respuesta) , con lo cual hace referencia a todos los cursos quw tengamos guardados
  }

  editarCurso(c: any){
    const {nombre, descripcion} = c

    this.cursoForm.setValue({nombre, descripcion})
  }

  eliminarCurso(idCurso:string){

    const c= confirm('¿estas seguro?')
    if(c){
      confirm('¿de verdad?')
    }
    return this.cursosService.eliminarCurso(idCurso).then(res =>
      alert('eliminado con exito!')) 
  }

  vaciarFormulario(){
    this.cursoForm.reset();
  }

  //tomamos los dato del formulario y lo enviamos al servicio y lo agregamos a la base de datos
  agregarCurso(){
    this.cursosService.agregarCurso(this.cursoForm.value)
    .then(res =>{
      this.vaciarFormulario();
      alert('producto agregado con exito')
    })
    .catch((err)=>{
      alert(err)
    })
  }
  //en agregar curso,tomo los valores del formulario(cursoForm.value) y luego(then) vacia el formulario,para asi despues cuando agregue otro elemento, tenga el formulario vacio

}
