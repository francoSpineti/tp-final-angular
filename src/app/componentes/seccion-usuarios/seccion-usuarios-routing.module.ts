import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from '../ingreso/registro/registro.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';

const routes: Routes = [
     { path: 'registro', component: RegistroComponent },
     { path: 'verUsuarios', component: VerUsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionUsuariosRoutingModule { }
