import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  myFormLogin=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  });
  myForm=new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    mobile:new FormControl('')
  });

  resData:any;
  errMsg:any;


  isLoggedIn:boolean= false;
  username:any='';
  useremail:any='';

  constructor(private fb:FormBuilder,private fbLogin:FormBuilder, public nav: NavbarService,private authser:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.validate();
    this.validateLogin();
    //this.isLoggedIn=this.authser.isLoggedIn();
    if(localStorage.getItem("id")!=undefined){
      if(localStorage.getItem("isLoggedIn") == "true"){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
    }
    this.authser.getSubjectIsLoggedIn().subscribe(data=>{
      console.log(data);
      if(data.isLoggedIn)
      {
        this.isLoggedIn=data.isLoggedIn;
      }
      if(data.isLoggedIn === false)
      {
        this.isLoggedIn=data.isLoggedIn;
      }
    })
    this.username=localStorage.getItem("name");
    this.useremail=localStorage.getItem("email");
  }
  // user registration
  validate(){
    this.myForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-Z+]')]],
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

  // user login
  validateLogin(){
    this.myFormLogin=this.fbLogin.group({
      email:['',[Validators.required],Validators.email],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
    })
  }
  userLogin(){
    let FormData = this.myFormLogin.getRawValue();
    console.log(FormData);
    this.authser.signIn(FormData)
    .subscribe(res=>{
      this.resData =  res;
      console.log(this.resData.status);
      if(this.resData.status == 200)
      {
          localStorage.setItem('id',this.resData.id);
          localStorage.setItem('email',this.resData.email);
          localStorage.setItem('name',this.resData.name);
          this.authser.isLoggedIn();
          this.errMsg = this.resData.msg;
          this.router.navigate(["/"]);
          //window.location.reload();
      }
      else{
        this.errMsg = this.resData.msg;
      }
    })
  }
  get loginErrors(){
    return this.myFormLogin.controls;
  }
  signOut(){
    if(window.confirm("Do u want to logout ?"))
    {
      this.authser.logout();
      //window.location.reload();
    }
  }

}
