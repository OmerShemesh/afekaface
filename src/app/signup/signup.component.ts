import { Component, OnInit } from '@angular/core';
import {  AuthProvider} from '../auth/auth.service';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  providers: [AuthProvider]
})
export class SignupComponent implements OnInit {

  user: { name: string, email: string, password: string }
  error: any;

  constructor(private auth: AuthProvider,private af:AngularFire) {
    this.user = { name: "", email: "", password: "" };
  }

  signup() {
    this.auth.registerUser({email:this.user.email,password:this.user.password}).subscribe(registerData => {
     
      
      this.auth.loginWithEmail(registerData).subscribe(loginData => {
         this.af.database.object(`/users/${this.auth.getUserId()}`).set({name:this.user.name,email:this.user.email});
        setTimeout(() => {

        }, 1000);
      }, loginError => {
        setTimeout(() => {

          this.error = loginError;
        }, 1000);
      });
    }, registerError => {
      setTimeout(() => {
        this.error = registerError;
      }, 1000);
    });
  }



  ngOnInit() {
  }

}
