import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods,FirebaseAuth,FirebaseAuthState} from "angularfire2";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthProvider {
  private authState: FirebaseAuthState = null;

  constructor(private af: AngularFire,public _auth:FirebaseAuth ) {
    _auth.subscribe((state:FirebaseAuthState)=>{
      this.authState = state;
    })

  }
  getUserId()
  {
     return this.authState.uid;
  }
  
  public get authenticated() : boolean {
    return this.authState !== null;
  }
  
  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          this.af.database.object("/users/" + authData.uid).subscribe(userData => {
            console.log(userData);
            observer.next(userData);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then((authData) => {
        credentials.created = true;
        observer.next(credentials);
      }).catch((error) => {
        if (error) {
          switch (error.code) {
            case "INVALID_EMAIL":
              observer.error("Invalid email.");
              break;
            case "EMAIL_TAKEN":
              observer.error("The specified email address is already in use.");
              break;
            case "NETWORK_ERROR":
              observer.error("An error occurred while attempting to contact the authentication server.");
              break;
            default:
              observer.error(error);
          }
        }
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

 

  logout() {
    this.af.auth.logout();
  }
}