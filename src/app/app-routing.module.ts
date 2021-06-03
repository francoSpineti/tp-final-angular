import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { ErrorComponent } from './componentes/error/error.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './componentes/mis-horarios/mis-horarios.component';

const routes: Routes = [
      { path: '', loadChildren: () => import('./componentes/ingreso/ingreso.module').then(m => m.IngresoModule) },
      { path: 'bienvenido', component : BienvenidoComponent },
      { path: 'seccionUsuarios', loadChildren: () => import('./componentes/seccion-usuarios/seccion-usuarios.module').then(m => m.SeccionUsuariosModule) },
      { path: 'perfil', component : MiPerfilComponent },
      { path: 'horarios', component : MisHorariosComponent },
      { path: 'seccion-turnos', loadChildren: () => import('./componentes/seccion-turnos/seccion-turnos.module').then(m => m.SeccionTurnosModule) },
      { path: '**', component : ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

