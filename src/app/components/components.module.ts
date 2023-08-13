import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormGroup } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent
  ]
})
export class ComponentsModule { }
