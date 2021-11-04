import { IProfesor } from "./profesor.interface";

export interface ICurso{
    id:string
    nombre: string,
    duracion: string,
    FechaInicio: string,
    imagen: string,
    descripcion: string,
    profesor: IProfesor

}