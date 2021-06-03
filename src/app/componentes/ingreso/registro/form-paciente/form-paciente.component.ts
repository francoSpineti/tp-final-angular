import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup ,Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/clases/paciente';
import { Persona } from 'src/app/clases/persona';
import { Perfiles } from 'src/app/enums/perfiles';
import { AuthService } from 'src/app/servicios/auth.service';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent implements OnInit {

  formGroup !: FormGroup;
  paciente !: Persona;
  imagen1: any= '';
  imagen2: any= ''; 
  foto1 : File;
  foto2 : File;
  auxReferencia : any;

  esAdmin : boolean = false;
  noEstaLogueado !: boolean;

  constructor(private formBuilder : FormBuilder,private router: Router,private authService : AuthService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {

    let obj = JSON.parse(localStorage.getItem('user'));
    if(obj != null){
      this.esAdmin = true;
      this.noEstaLogueado = false;
    }else{
      this.noEstaLogueado = true;
    }

     this.formGroup = this.formBuilder.group({
      'nombre' : ['',[Validators.required]],
      'apellido' : ['',[Validators.required]],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni' : ['',[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required],
      'obraSocial' : ['',Validators.required],
      'imagenUno' : ['',[Validators.required,Validators.nullValidator]],
      'imagenDos' : ['',[Validators.required,Validators.nullValidator]]
    });
  }

  //crear enum para los perfiles
  crearPaciente(){
    const nombre = this.formGroup.controls['nombre'].value;
    const apellido = this.formGroup.controls['apellido'].value;
    const edad = this.formGroup.controls['edad'].value;
    const dni = this.formGroup.controls['dni'].value;
    const mail = this.formGroup.controls['mail'].value;
    const password = this.formGroup.controls['password'].value;
    const obraSocial = this.formGroup.controls['obraSocial'].value;
    let rutaImagen1 : string = "";
    let rutaImagen2 : string = "";
    //cargo fotos
    let ruta : string = "pacientes/"+dni;
    const rutaRef = this.storage.ref(ruta);
     this.auxReferencia = this.storage.upload(ruta,this.foto1).snapshotChanges().pipe(
      finalize(()=>{
        rutaRef.getDownloadURL().subscribe(url =>{
          rutaImagen1 = url;
          let ruta2 : string = "pacientes/"+ dni + "_2";
          const rutaRef2 = this.storage.ref(ruta2);
          this.auxReferencia = this.storage.upload(ruta2,this.foto2).snapshotChanges().pipe(
            finalize(()=>{
                rutaRef2.getDownloadURL().subscribe(url =>{
                  rutaImagen2 = url;
                this.paciente = new Paciente("",nombre,apellido,edad,dni,mail,password,Perfiles.PACIENTE,obraSocial,rutaImagen1,rutaImagen2);
                this.authService.registrarse(this.paciente);
              });
            })
          ).subscribe();
        });
      })
    ).subscribe();
  }

  mostrarImagen1(event) {
      let file = event.target.files[0];
      if(file != undefined){
        var reader = new FileReader();
        this.foto1 = file;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
        this.imagen1 = (<FileReader>event.target).result;
       }
      }else{
        this.imagen1 = '';
        this.foto1 = null;
      }
  }

  mostrarImagen2(event) {
    let file = event.target.files[0];
    if(file != undefined){
      var reader = new FileReader();
      this.foto2 = file;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
      this.imagen2 = (<FileReader>event.target).result;
     }
    }else{
      this.imagen2 = '';
      this.foto2 = null;
    }
  }

  limpiarForm(){
    this.formGroup.reset();
  }

}
