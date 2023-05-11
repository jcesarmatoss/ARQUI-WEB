import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Empleado } from '../models/empleado';
//Importar el modelo del servicio
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  //Ruta del Servidor
  ruta_servidor:string ="http://localhost:3000";
  recurso:string="empleados";
  //Constructor
  //Para acceder al json server necesitamos un HTTP Client
  constructor(private http:HttpClient) { }

  //Obtener todos los empleados
  //http.get.<MODELO[]>
  getEmpleados(){
    return this.http.get<Empleado[]>(this.ruta_servidor+"/"+this.recurso);
  }
  //Obtener empleado por ID
  //http.get.<MODELO>
  getEmpleado(id:number){
    return this.http.get<Empleado>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }
  //Agregar empleado que recibe un empleado
  //http.post.<MODELO>(ruta,modelo)
  addEmpleado(empleado:Empleado){
    return this.http.post<Empleado>(this.ruta_servidor+"/"+this.recurso,empleado);
  }
  //Actualizar empleado que recibe un empleado
  //http.put.<MODELO>(ruta+modelo.id.toString,empleado)
  updateEmpleado(empleado:Empleado){
    return this.http.put<Empleado>(this.ruta_servidor+"/"+this.recurso+"/"+empleado.id.toString(),empleado);
  }
  //Borrar empleado por id
  //http.delete(ruta+id.toString)
  deleteEmpleado(id:number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }
}
