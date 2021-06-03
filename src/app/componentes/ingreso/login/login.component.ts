import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Administrador } from 'src/app/clases/administrador';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup !: FormGroup;
  mostrarSpinner : boolean = false;
  arregloUsuarios : any;
  spiner : boolean = false;

  constructor(private formBuilder : FormBuilder,private authService : AuthService, private spinnerService : NgxSpinnerService,
    private usuariosService : UsuarioService,private router : Router) { }

  ngOnInit(): void {
 /*    this.usuariosService.getUsuarios().subscribe(ref=>{
      this.arregloUsuarios = ref;
    }); */
    this.formGroup = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required]
    });
  }

  verificarForm(value : any){
    
    if(this.formGroup.valid){
        this.iniciarSesion(value.email,value.password);
    }
  }

  iniciarSesion(email : string, password : string){

    this.spiner = true;
    var ref : any;
    this.authService.login(email,password)
    .then(res =>{
      let uid : any = res.user.uid;
      ref = this.authService.getUser(email,uid)
      .subscribe(sub =>{
        let aux : any = sub;
        if(aux.data().perfil === "paciente"){

          if(res.user.emailVerified){
            
          let auxPaciente = new Paciente(aux.data().id,aux.data().nombre,aux.data().apellido,aux.data().edad,aux.data().dni,email,password,
          aux.data().perfil,aux.data().obraSocial,aux.data().imagenUno,aux.data().imagenDos);

          localStorage.setItem('user',JSON.stringify(auxPaciente.toJson()));
          this.spiner = false;
          this.router.navigate(['/bienvenido']);
          }else{
            this.spiner = false;
            this.mostrarMensajeError("Su email no se encuentra verificado, por favor verifique su email para poder ingresar.");
          }
        }else if(aux.data().perfil === "especialista"){

          if(aux.data().emailVerificadoPorAdmin){
            let auxEspecialista = new Especialista(aux.data().id,aux.data().nombre,aux.data().apellido,aux.data().edad,aux.data().dni,email,password,
            aux.data().perfil,aux.data().especialidad,aux.data().imagen,aux.data().emailVerificadoPorAdmin);
  
            localStorage.setItem('user',JSON.stringify(auxEspecialista.toJson()));
            this.spiner = false;
            this.router.navigate(['/bienvenido']);
          }else{
            this.spiner = false;
            this.mostrarMensajeError("Su email debe ser habilitado por un administrador para poder ingresar al sistema.");
          }
        }else if(aux.data().perfil === "administrador"){

          let auxAdmin = new Administrador(aux.data().id,aux.data().nombre,aux.data().apellido,aux.data().edad,aux.data().dni,email,password,
          aux.data().perfil,aux.data().imagen);

          localStorage.setItem('user',JSON.stringify(auxAdmin.toJson()));
          this.router.navigate(['/bienvenido']);
        }
        ref.unsubscribe();
      })
    }).catch( 
      error => {  this.spiner = false; this.mostrarMensajeError(error.message);
    });
  }

  spinner() : void{
    this.spinnerService.show();
    setTimeout(() =>{
      this.spinnerService.hide();
    },5000);
  }

  mostrarMensaje(titulo : string,mensaje : string){
    Swal.fire(
       titulo,
       mensaje,
      'success'
    )
  }

  mostrarMensajeError(mensaje : string){
    Swal.fire({
      icon: 'error',
      title: mensaje
    })
  }

}
