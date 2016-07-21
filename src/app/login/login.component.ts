import { Component, OnInit,OnDestroy,EventEmitter,Output } from '@angular/core';
import { AuthProvider } from '../auth/auth.service';
import { AngularFire } from 'angularfire2';
import { NgForm }    from '@angular/common'
import { Router } from '@angular/router';
import { LoadingService } from '../loading/loading.service';
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers:[]
})
export class LoginComponent implements OnInit {
  error:any;
  email:string;
  password:string;
  loginVar;

  constructor(private _auth:AuthProvider,private af:AngularFire,private _route:Router,private loading:LoadingService) {
    
  }

  ngOnInit() {
   this.email = "";
    this.password="";
  }
 login() {  
   this.loginVar =  this._auth.loginWithEmail({email:this.email,password:this.password});
   this.loginVar.subscribe(data => {
      this.loading.start();
      this._route.navigate(['/user',this._auth.getUserId()])
      
    }, err => {
      setTimeout(() => {
        this.error = err;
      }, 1000);
    });
 }

 ngOnDesroy(){
   this.loginVar.unsubscribe()
 }

} 
