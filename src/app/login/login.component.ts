import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../auth/auth.service';
import { AngularFire } from 'angularfire2';
import { NgForm }    from '@angular/common'
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers:[AuthProvider]
})
export class LoginComponent implements OnInit {
  error:any;
  email:string;
  password:string;
  constructor(private _auth:AuthProvider,private af:AngularFire) {
    this.email = "";
    this.password="";
  }

  ngOnInit() {
    
  }

 login() {  
    this._auth.loginWithEmail({email:this.email,password:this.password}).subscribe(data => {
      setTimeout(() => {
        
      }, 1000);
    }, err => {
      setTimeout(() => {
        this.error = err;
      }, 1000);
    });
 }

} 
