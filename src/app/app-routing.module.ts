import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [
  //Aqui van los paths
  {path:'',component:HomeComponent},
  {path:'new',component:AddEditComponent},
  {path:'edit/:id',component:AddEditComponent},
  {path:'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
