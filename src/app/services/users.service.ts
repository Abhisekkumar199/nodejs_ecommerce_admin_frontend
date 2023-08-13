import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL="http://localhost:80/project/angularcrudapp/webservices";
  httpOptions={
   headers:new HttpHeaders({
     'Content-Type':'application/json',
     "Access-Control-Allow-Origin": "*"
   })
  }
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<Users[]>{
		return this.http.get<Users[]>(`${this.apiURL}/user_list.php`);
	}
  getUserDetails(id:number){
    return this.http.get<Users>(`${this.apiURL}/get_user_details.php?id=${id}`);
  }
  addnewUser(user: Users): Observable<Users>{
		return this.http.post<Users>(`${this.apiURL}/add-user.php`, user);
	}
	editUser(user: Users){
		return this.http.post<Users>(`${this.apiURL}/edit-user.php`, user);
	}
	deleteUser(id: number){
		return this.http.delete<Users>(`${this.apiURL}/delete_user.php/?id=${id}`);
	}
}
