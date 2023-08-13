import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Subject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subject=new Subject<any>();
  private apiURL="http://localhost/project/angularcrudapp/webservices";
  /*private api_token = "4|1fp7DQqFsAjbvBb7c0MftTQ6M3O2ZEtA1FMljLjQ";
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_token}`
  });

  private requestOptions = { headers: headers };*/
  constructor(private http:HttpClient,private router:Router) { }
  signIn(data:any){

    return this.http.post(`${this.apiURL}/user_login.php`,data);
  }
  signUp(data:any){
    return this.http.post(`${this.apiURL}/user_register.php`,data);
  }
  isLoggedIn(){
    const data=localStorage.getItem("id");
    if(!data)
    {
      this.subject.next({isLoggedIn:false});
      localStorage.setItem("isLoggedIn","false");
      return false;
    }
    else
    {
      localStorage.setItem("isLoggedIn","true");
      this.subject.next({isLoggedIn:true});
      return true;
    }
  }
  getToken(){
    return localStorage.getItem("id");
  }
  getUser():any{
    try{
      let token:any = localStorage.getItem("id");
      return jwtDecode(token);
    }
    catch(ex){
      return null;
    }
  }
  isAdmin(){
    return !this.getUser()?false:this.getUser().isAdmin;
  }
  logout(){
    this.subject.next({isLoggedIn:false});
    localStorage.removeItem("id");
    this.router.navigate(["/"]);
  }
  getSubjectIsLoggedIn():Observable<any>{
    return this.subject.asObservable();
  }

}
