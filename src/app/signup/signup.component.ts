import { Component, OnInit,OnDestroy } from '@angular/core';
import {  AuthProvider} from '../auth/auth.service';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { LoadingService } from '../loading/loading.service';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  providers: []
})
export class SignupComponent implements OnInit {

  user: { name: string, email: string, password: string }
  error: any;

  constructor(private auth: AuthProvider,private af:AngularFire,private router:Router,private loading:LoadingService) {
    this.user = { name: "", email: "", password: "" };
  }

  signup() {
    
    this.auth.registerUser({email:this.user.email,password:this.user.password}).subscribe(registerData => {
       this.loading.start();
      this.auth.loginWithEmail(registerData).subscribe(loginData => {
       
         this.af.database.object(`/users/${this.auth.getUserId()}`).set({name:this.user.name,email:this.user.email});
         
      }, loginError => {
        setTimeout(() => {
          
          this.error = loginError;
        }, 1000);
      });
      this.router.navigate(['/user',this.auth.getUserId()]);
    }, registerError => {
      setTimeout(() => {
        this.error = registerError;
      }, 1000);
    });
    
  }



  ngOnInit() {
    
  }

 
}
