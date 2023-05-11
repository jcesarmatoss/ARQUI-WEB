import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  EsInsertar:boolean=true;
  //nombre del formulario : "myForm"
  myForm!:FormGroup;
  id!:number;
  //Crear un constructor que reciba el formulario
  //El servio del modelo EmpleadosSerice
  constructor(private formBuilder:FormBuilder, private empleadoService:EmpleadosService, private router:Router,
    private activatedRouter:ActivatedRoute, private snackBar:MatSnackBar){}
  
  ngOnInit(){
    this.reactiveForm();
  }
  reactiveForm():void{
    //Validar que los campos no esten vacios
    this.myForm=this.formBuilder.group({
      id:[""],
      nombre:["",[Validators.required,Validators.maxLength(60)]],
      puesto:["",[Validators.required, Validators.maxLength(50)]],
      sueldo:["",[Validators.required]]
    })
    //Obtener el id que esta llegando por la ruta del browser en casos de Editar
    // Si (id== a un numero) entonces debo cargar los datos de ese empleado para cargarlos
    // Sino

    //ActivatedRoute es para guardar datos del navegador
    this.id=this.activatedRouter.snapshot.params["id"];


    if(this.id!=0 && this.id!=undefined){
      //Si es diferente de 0 estamos en editar
      this.EsInsertar=false;
      this.empleadoService.getEmpleado(this.id).subscribe({
        next: (data:Empleado)=>{
          //get("nameColumn") - data.atritbutomodel
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("nombre")?.setValue(data.nombre);
          this.myForm.get("puesto")?.setValue(data.puesto);
          this.myForm.get("sueldo")?.setValue(data.sueldo);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }else{
      this.id=0;
      this.EsInsertar=true;
    }

  }

  saveEmpleado():void{
    //Guardar los datos del empleado en la variable empleado
    //Crea una variable empleado y guarda los datos del form
    const empleado:Empleado={
      id:this.id,
      nombre:this.myForm.get("nombre")!.value,
      puesto:this.myForm.get("puesto")!.value,
      sueldo:parseFloat(this.myForm.get("sueldo")!.value),
    }
    //Si es insertar añade la nueva variable
    //Si EsInsertar entoncecs
    if (this.EsInsertar) {
      //this.empleadoService.addEmpleado(empleado);
      //Se suscribe
      this.empleadoService.addEmpleado(empleado).subscribe({
        next:(data)=>{
          this.router.navigate(["/home"]);
          this.snackBar.open("El empleado se ingresó correctamente","OK",{duration:2000});
          
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }else{
      //Hacer el codigo de actualizar
      this.empleadoService.updateEmpleado(empleado).subscribe({
        next:(data)=>{
          this.router.navigate(["/home"]);
          this.snackBar.open("El empleado se actualizó correctamente","OK",{duration:2000});
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }

  volverHome():void{
    this.router.navigate(["/home"]);
    this.EsInsertar=false;
  }
}
