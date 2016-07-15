import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthProvider } from '../auth/auth.service';

@Injectable()
export class PostsService {

    constructor(private af:AngularFire) { 
        
    }

    post(userId:string,postText:string,privatePost:boolean)
    {
        this.af.database.list(`/users/${userId}/posts`).push({text:postText,private:privatePost,date:new Date().toLocaleDateString()});  
    }
    getUserPosts(userId:string){
        return this.af.database.list(`/users/${userId}/posts`);
    }

}