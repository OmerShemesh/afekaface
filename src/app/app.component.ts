import { Component,OnInit } from '@angular/core';
import { AngularFire,AuthProviders,AuthMethods } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthProvider } from './auth/auth.service';
import { LoadingComponent } from './loading/loading.component';
import { ROUTER_DIRECTIVES,Router } from '@angular/router';
import { LoadingService } from './loading/loading.service';
import { SearchComponent } from './search/search.component';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives:[LoginComponent,LoadingComponent,ROUTER_DIRECTIVES,SearchComponent],
  providers:[]
  
})



export class AppComponent  {
  

  numbers : any;
  constructor(private _af:AngularFire,private _auth:AuthProvider,private router:Router,private loading:LoadingService) 
  {
    
  }

  logout()
  {
    this.router.navigate(['/signup']);
    this._auth.logout();
    
  }

  hasAuth()
  {
    return this._auth.authenticated;
  }
 
  ngOnInit()
  {
   
  }
 
}
