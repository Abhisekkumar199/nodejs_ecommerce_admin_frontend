import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enquiries } from '../enquiries';
@Injectable({
  providedIn: 'root'
})
export class EnquiriesService {
  private apiURL="http://localhost:80/project/angularcrudapp/webservices";
  httpOptions={
   headers:new HttpHeaders({
     'Content-Type':'application/json',
     "Access-Control-Allow-Origin": "*"
   })
  }
  constructor(private http:HttpClient) { }
  getAllEnquiry():Observable<any>{
		return this.http.get<Enquiries[]>(`${this.apiURL}/enquiry_list.php`);
  }
  getEnquiryDetails(id:number){
    return this.http.get<Enquiries>(`${this.apiURL}/get_enquiry_details.php?id=${id}`);
  }
  addEnquiry(enquiry: Enquiries): Observable<Enquiries>{
		return this.http.post<Enquiries>(`${this.apiURL}/add-enquiry.php`, enquiry);
	}
	editEnquiries(enquiry: Enquiries){
		return this.http.post<Enquiries>(`${this.apiURL}/edit-enquiry.php`, enquiry);
	}
	deleteEnquiry(id: number){
		return this.http.delete<Enquiries>(`${this.apiURL}/delete_enquiry.php/?id=${id}`);
	}
}
