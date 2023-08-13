import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
myForm=new FormGroup({
  name:new FormControl(''),
  lname:new FormControl(''),
  email:new FormControl(''),
  password:new FormControl(''),
  mobile:new FormControl('')
});
  constructor(private fb:FormBuilder, public nav: NavbarService,public sidebar: SidebarService,private authser:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.nav.hide();
    this.sidebar.hide();
    this.validate();
  }
  validate(){
    this.myForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-Z+]')]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z+]')]],
      email:['',[Validators.required],Validators.email],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
    })
  }
  userRegister(){
    let FormData = this.myForm.getRawValue();
    console.log(FormData);
    this.authser.signUp(FormData).subscribe(res=>{
      console.log(res);
      if(res){
        alert("User Registered");
        this.router.navigate(["/"]);
      }
    });
  }
  get f(){
    return this.myForm.controls;
  }
}
