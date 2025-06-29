import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  isSignup:boolean = false;
  formData!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthserviceService){}

  ngOnInit(): void {
      this.formData = this.fb.group({
        name:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(7)]],
        confirmPassword:['',[Validators.required]]
      },{validators: this.passwordValidator});
  }

  logIn(){
    this.router.navigate(['/login']);
  }

  signUp(){ 
    this.isSignup = false;
  }

  passwordValidator(form:FormGroup){
    const pass = form.get('password')?.value;
    const confirmpass = form.get('confirmPassword')?.value;
    return pass == confirmpass ? null : {passwordMissMatch:true};
  }

  submitForm(formData:FormGroup){
    this.authService.signUpUser(formData).subscribe({
      next:(res)=>{
        if(res){
          console.log('signUp');
          this.formData.reset(); 
        }else{
          console.log('signUp failed');
        }
      },
      error:()=>{
        console.log('unhandled error');
      }
    })
  }

  // showPopUp(message:string){
  //   this.snakBar.open(message,'close',{
  //     duration:3000,
  //     horizontalPosition:'right',
  //     verticalPosition:'bottom',
  //   });
  // }

}
