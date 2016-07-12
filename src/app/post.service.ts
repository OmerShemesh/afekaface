import { Injectable } from '@angular/core';
import { AngularFire,FirebaseObjectObservable} from 'angularfire2';


@Injectable()
export class PostService {

  currentUser : FirebaseObjectObservable<any>;
  constructor(private _af:AngularFire) {

  }

  
  getPosts(uid)
  {
    

    
  }

}
