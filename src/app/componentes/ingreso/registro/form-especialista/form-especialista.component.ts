import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup ,Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Perfiles } from 'src/app/enums/perfiles';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrls: ['./form-especialista.component.css']
})
export class FormEspecialistaComponent implements OnInit {

  formGroup !: FormGroup;
  especialista !: Especialista;
  lista = new Array<string>();
  imagen1: any= '';
  foto1 : File;
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
      'especialidad' : [],
      'imagen' : ['',[Validators.required,Validators.nullValidator]]
    });
  }

  crearEspecialista(){
    const nombre = this.formGroup.controls['nombre'].value;
    const apellido = this.formGroup.controls['apellido'].value;
    const edad = this.formGroup.controls['edad'].value;
    const dni = this.formGroup.controls['dni'].value;
    const mail = this.formGroup.controls['mail'].value;
    const password = this.formGroup.controls['password'].value;
    let rutaImagen : string = "";
    //cargo foto
    let ruta : string = "especialistas/".concat(dni.toString());
    const rutaRef = this.storage.ref(ruta);
    this.auxReferencia = this.storage.upload(ruta,this.foto1).snapshotChanges().pipe(
      finalize(()=>{
        rutaRef.getDownloadURL().subscribe(url =>{
                rutaImagen = url;
                this.especialista = new Especialista("",nombre,apellido,edad,dni,mail,password,Perfiles.ESPECIALISTA,this.lista,rutaImagen,false);
                this.authService.registrarse(this.especialista);
              });
            })
          ).subscribe();
  }

  agregar(){

    const especialidad = this.formGroup.controls['especialidad'].value;
    if(especialidad == null){
    }
    else if(especialidad !== null || especialidad != undefined || especialidad !== "" ){
        this.lista.push(especialidad);
        this.formGroup.controls['especialidad'].setValue('');
    }
  }

  mostrarImagen(event) {
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

  limpiarForm(){
    this.formGroup.reset();
  }

}
