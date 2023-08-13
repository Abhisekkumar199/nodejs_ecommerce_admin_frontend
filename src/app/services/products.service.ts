import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../users';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL="http://localhost:80/project/angularcrudapp/webservices";


  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Users[]>{
		return this.http.get<Users[]>(`${this.apiURL}/user_list.php`);
	}
}
