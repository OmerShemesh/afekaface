import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase,AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { disableDeprecatedForms,provideForms } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/app.routes'
import { LoadingService } from './app/loading/loading.service';
import { AuthProvider } from './app/auth/auth.service';
import { AuthGuard } from './app/auth/auth.guard';



if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase({
     apiKey: ",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
  }),
  firebaseAuthConfig({
    provider:AuthProviders.Password,
    method:AuthMethods.Password,
    remember:"none"
  }),
  AuthGuard,
  AuthProvider,
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS,
  LoadingService,
  
]);

