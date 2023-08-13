import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resData:any;
  errMsg:any;
  myForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  });
  constructor(private fb:FormBuilder,public nav: NavbarService,public sidebar: SidebarService,private authser:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.nav.hide();
    this.sidebar.hide();
    this.validate();
  }
  validate(){
    this.myForm=this.fb.group({
      email:['',[Validators.required],Validators.email],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
    })
  }
  userLogin(){
    let FormData = this.myForm.getRawValue();
    this.authser.signIn(FormData)
    .subscribe(res=>{
      this.resData =  res;
      console.log(this.resData.status);
      if(this.resData.status == 200)
      {
          localStorage.setItem('id',this.resData.id);
          localStorage.setItem('email',this.resData.email);
          localStorage.setItem('name',this.resData.name);
          this.errMsg = this.resData.msg;
          this.router.navigate(["/dashboard"]);
      }
      else{
        this.errMsg = this.resData.msg;
      }
    })
  }
  get f(){
    return this.myForm.controls;
  }
}
