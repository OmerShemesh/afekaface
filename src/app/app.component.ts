import { Component,OnInit} from '@angular/core';
import { AngularFire,FirebaseObjectObservable } from 'angularfire2';
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
  providers:[],

  
})



export class AppComponent implements OnInit  {
  

  numbers : any;
  alert : string;
  profile_pic;
  constructor(private _af:AngularFire,private auth:AuthProvider,private router:Router,private loading:LoadingService) 
  {
        
  }

  logout()
  {
    this.auth.logout();
    this.profile_pic = null;
    this.router.navigate(['/signup']);
  }

  hasAuth()
  {
    return this.auth.authenticated;
  }
 
  
  onLogin(pic)
  {
    this.profile_pic = pic;
  }
  ngOnInit()
  {
      this.auth.getUserData().subscribe((userData)=>{
        this.profile_pic = userData.profile_pic;
      })
  }

 
 
}
