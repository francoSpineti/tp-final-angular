import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup !: FormGroup;
  mostrarSpinner : boolean = false;

  constructor(private formBuilder : FormBuilder,private authService : AuthService, private spinnerService : NgxSpinnerService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required]
    });
  }

  iniciarSesion(){
    this.mostrarSpinner = true;
    this.spinner();
    const email = this.formGroup.controls['email'].value;
    const password = this.formGroup.controls['password'].value;
    this.authService.iniciarSesion(email,password);
  }

  spinner() : void{
    this.spinnerService.show();
    setTimeout(() =>{
      this.spinnerService.hide();
    },2000);
  }

}
