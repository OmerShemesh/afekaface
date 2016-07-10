import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: RouterConfig = [

  { path: 'signup',component:SignupComponent},
  { path: '**',component:NotfoundComponent},
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];