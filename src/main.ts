import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase,AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { disableDeprecatedForms,provideForms } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/app.routes'
import { LoadingService } from './app/loading/loading.service';

declare var firebase:any;


if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase({
     apiKey: "AIzaSyB-C5VqSu0RbLN02wLLfZ3cOJ5Nm3Y-eVw",
    authDomain: "afekaface-e128c.firebaseapp.com",
    databaseURL: "https://afekaface-e128c.firebaseio.com",
    storageBucket: "afekaface-e128c.appspot.com",
  }),
  firebaseAuthConfig({
    provider:AuthProviders.Password,
    method:AuthMethods.Password
  }),
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS,
  LoadingService
]);

