import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {

  data !: any;
  listaEspecialistas = new Array<Especialista>();
  listaPacientes = new Array<Paciente>();
  listaAdmin = new Array<Administrador>();

  constructor(private usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(ref => {
      this.data = ref;
    });
  }

  habilitar(especialista: Especialista) {
    this.usuariosService.habilitarEspecialista(especialista);
  }
}