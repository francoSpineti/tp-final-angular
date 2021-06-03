import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormAdministradorComponent } from './registro/form-administrador/form-administrador.component';
import { FormEspecialistaComponent } from './registro/form-especialista/form-especialista.component';
import { FormPacienteComponent } from './registro/form-paciente/form-paciente.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path :'login' , component : LoginComponent},         
  {path :'registro' , component : RegistroComponent},
  {path :'altaPaciente' , component : FormPacienteComponent},
  {path :'altaEspecialista' , component : FormEspecialistaComponent},
  {path :'altaAdministrador' , component : FormAdministradorComponent},
  {path : '', redirectTo : 'login', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
