import { Component,OnInit } from '@angular/core';
import { AngularFire,AuthProviders,AuthMethods } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthProvider } from './auth/auth.service';
import { LoadingComponent } from './loading/loading.component';
import { ROUTER_DIRECTIVES,Router } from '@angular/router';






@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives:[LoginComponent,SignupComponent,LoadingComponent,ROUTER_DIRECTIVES],
  providers:[AuthProvider]
  
})



export class AppComponent  {
  


  
  constructor(private _af:AngularFire,private _auth:AuthProvider,private router:Router) 
  {
   
  }

  logout()
  {
    this._auth.logout();
    this.router.navigate(['/signup']);
  }

  hasAuth()
  {
    return this._auth.authenticated;
  }
 
  ngOnInit()
  {
   
  }
 
}
