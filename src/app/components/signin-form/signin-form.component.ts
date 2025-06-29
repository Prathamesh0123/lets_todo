import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {
 isLogin:boolean = false;
  user : {email:string,password:string} = {email:'',password:''};

  constructor(private router:Router,private authService:AuthserviceService){}

  signUp(){
    this.router.navigate(['/signup']);
  }

  logIn(){
    if(this.user){
      console.log(this.user);
      this.authService.signInUser(this.user).subscribe({
        next:(res)=>{
          if(res){
            alert('logged in');
            this.router.navigate(['/home']);
          }else{
            alert('login failed');
          }
        },
        error:(err)=>{
          console.log('unhnadled error',err);
        }
      });
    }else{
      alert('all fields must fill');
    }
  }
}
