import { Component,OnInit } from '@angular/core';
import { AngularFire,AuthProviders,AuthMethods } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthProvider } from './auth/auth.service';
import { LoadingComponent,Loading } from './loading/loading.component';
import { ROUTER_DIRECTIVES } from '@angular/router';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives:[LoginComponent,SignupComponent,LoadingComponent,ROUTER_DIRECTIVES],
  providers:[AuthProvider]
  
})



export class AppComponent extends Loading {
  


  auth;
  constructor(private _af:AngularFire,private _auth:AuthProvider) 
  {
    super(true);
  }

  logout(){
    this._auth.logout();
  }

  hasAuth()
  {
    this.standby();
    this.auth = this._auth.authenticated;
    this.ready();
   
  }
 
  ngOnInit()
  {
    this.hasAuth();
    this.standby();
    this.hasAuth();
  }

}
