import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { PostsComponent } from './posts/posts.component';
import { AuthProvider } from './auth/auth.service';
import { SearchComponent } from './search/search.component';

export const routes: RouterConfig = [
 
  { path: 'signup',component:SignupComponent},
  { path:'user/:id',component:PostsComponent,canActivate:[AuthGuard] },
  { path:'',component:PostsComponent,canActivate:[AuthGuard]} ,
  { path: '**',component:NotfoundComponent},

  
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),AuthGuard,AuthProvider
];