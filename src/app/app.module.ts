import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './componentes/error/error.component';
import { IngresoRoutingModule } from './componentes/ingreso/ingreso-routing.module';
import { LoginComponent } from './componentes/ingreso/login/login.component';
import { RegistroComponent } from './componentes/ingreso/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { VerUsuariosComponent } from './componentes/seccion-usuarios/ver-usuarios/ver-usuarios.component';
import { OpcionesComponent } from './componentes/seccion-usuarios/opciones/opciones.component';
import { SeccionUsuariosModule } from './componentes/seccion-usuarios/seccion-usuarios.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import {MatInputModule} from '@angular/material/input';
import { MisHorariosComponent } from './componentes/mis-horarios/mis-horarios.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormPacienteComponent } from './componentes/ingreso/registro/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from './componentes/ingreso/registro/form-especialista/form-especialista.component';
import { FormAdministradorComponent } from './componentes/ingreso/registro/form-administrador/form-administrador.component';
import { SolicitarTurnoComponent } from './componentes/seccion-turnos/solicitar-turno/solicitar-turno.component';
import { MisTurnosComponent } from './componentes/seccion-turnos/mis-turnos/mis-turnos.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent,
    OpcionesComponent,
    VerUsuariosComponent,
    MiPerfilComponent,
    MisHorariosComponent,
    FormPacienteComponent,
    FormEspecialistaComponent,
    FormAdministradorComponent,
    SolicitarTurnoComponent,
    MisTurnosComponent
  ],
  imports: [
    BrowserModule,
    IngresoRoutingModule,
    SeccionUsuariosModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
