import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionUsuariosRoutingModule } from './seccion-usuarios-routing.module';
import { TablasUsuariosComponent } from './ver-usuarios/tablas-usuarios/tablas-usuarios.component';

@NgModule({
  declarations: [
  
    TablasUsuariosComponent
  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule
  ]
})
export class SeccionUsuariosModule { }
