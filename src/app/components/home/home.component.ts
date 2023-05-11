import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //Fuente de datos llenado con Empleados
  dataSource=new MatTableDataSource<Empleado>();
  //dataSource!: MatTableDataSource<Empleado>;
  //Estas son las columnas que quieres que vea el usuario
  //Aunque en el html muestres todas, solo mostrará las que indiques aquí
  displayedColumns:string[]=["id","nombre","puesto","sueldo","sueldo_dolares","actions"];
  
  @ViewChild('paginator')
  paginator!:MatPaginator;
  constructor (private empleadoService:EmpleadosService){}
  //Carga el inicio
  ngOnInit(){
    this.CargarEmpleados();
  }

  filterEmpleados(event:Event){
    let filtro=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filtro;
  }

  campoCalculadoSueldoDolares(sueldo_soles:number):number{
    let sueldo_dolares=sueldo_soles/3.72;
    sueldo_dolares=parseFloat(sueldo_dolares.toFixed(2));
    return  sueldo_dolares;
  }
  //Mostrar empleados en MatTableDataSource
  CargarEmpleados():void{
    //Llama al servicio y llama a la función y se suscribe
    this.empleadoService.getEmpleados().subscribe({
      next: (data:Empleado[])=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  deleteEmpleado(id:number):void{
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: (data)=>{
        this.CargarEmpleados();
        
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
}
