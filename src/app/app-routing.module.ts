import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { ErrorComponent } from './componentes/error/error.component';

const routes: Routes = [
      { path: '', loadChildren: () => import('./componentes/ingreso/ingreso.module').then(m => m.IngresoModule) },
      { path: 'bienvenido', component : BienvenidoComponent },
      { path: '**', component : ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
