import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map ,Observable,of, retry} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  //this is authservice going to handle all login/logout/isloggedIn methods and token management here 
  constructor(private http:HttpClient) { }

  checkUserToken():Observable<boolean>{
    const token = localStorage.getItem('token');
    
      const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    console.log(headers);
    
    return this.http.post('http://localhost:3000/api/home',{},{headers}).pipe(
      map(()=>{
        return true;
      }),
      catchError((err)=>{
        console.log(err.error.message);
        
        return of(false);
      })
    )

  }
  signUpUser(userData:any):Observable<boolean>{
    const data = {
      name:userData.value.name,
      email:userData.value.email,
      password:userData.value.password
    }

    return this.http.post('http://localhost:3000/api/signup',data).pipe(
      map((res:any)=>{
        console.log('data send to the back end success!!!',res);
        return true;
      }),
     catchError((err)=>{
        console.log('err',err.error.message);
        return of(false);
      })  
    )
  }

  signInUser(userData:any):Observable<boolean>{
    const data = {
      email:userData.email,
      password:userData.password,
    }

    return this.http.post('http://localhost:3000/api/signin',data).pipe(
      map((res:any)=>{
        console.log('user logged in from UI ',res);
        localStorage.setItem('token',res.token);
        return true;
      }),
      catchError((err)=>{
        console.log(err.error.message);
        return of(false);
      })
    );
  }
}
