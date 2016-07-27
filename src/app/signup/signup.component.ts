import { Component, OnInit, OnDestroy } from '@angular/core';
import {  AuthProvider} from '../auth/auth.service';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { LoadingService } from '../loading/loading.service';
import { StorageService } from '../storage.service';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  providers: [StorageService]
})
export class SignupComponent implements OnInit {

  user: { name: string, email: string, password: string }
  error: any;
  profilePic;

  constructor(private auth: AuthProvider, private af: AngularFire, private router: Router, private loading: LoadingService, private sr: StorageService) {
    
  }

  signup() {

    this.auth.registerUser({ email: this.user.email, password: this.user.password }).subscribe(registerData => {
      this.loading.start();
       this.sr.uploadProfilePic(this.profilePic, this.auth.getUserId()).subscribe(uploadData => {

        }, error => {
          this.error = error;
        });
      this.auth.loginWithEmail(registerData).subscribe(loginData => {

        this.af.database.object(`/users/${this.auth.getUserId()}`).set({ name: this.user.name, email: this.user.email });
       
      }, loginError => {
        setTimeout(() => {

          this.error = loginError;
        }, 1000);
      });
      this.router.navigate(['/user', this.auth.getUserId()]);
    }, registerError => {
      setTimeout(() => {
        this.error = registerError;
      }, 1000);
    });

  }
  onFileSelect(e: any) {
    let filename = e.srcElement.files[0].name;
    let elem = <HTMLInputElement>document.getElementById("file");
    if(['jpg','png','gif'].indexOf(filename.substr(filename.lastIndexOf('.')+1)) === -1)
    {
      this.error = "Please Use A valid image file! (jpg,png,gif)";
      elem.value = "";
    }
    else
    {
      this.profilePic = e.srcElement.files[0];
      this.error = "";
    }
    
  }



  ngOnInit() {
    this.user = { name: "", email: "", password: "" };
  }


}
