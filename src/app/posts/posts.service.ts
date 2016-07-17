import { Injectable } from '@angular/core';
import { AngularFire,FirebaseListObservable } from 'angularfire2';

import { FriendsService } from '../friends.service';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class PostsService {
    friends: Array<any>;
    constructor(private af: AngularFire, private fService: FriendsService, private loading: LoadingService) {
        this.friends = fService.getFriends();
        
    }

    addPost(userId:string,name: string, postText: string, privatePost: boolean) {
        if(!privatePost){
            this.fService.getFriends().forEach(element => {
                this.af.database.list(`/posts/${element.$key}`).push({name: name, text: postText, private: privatePost, date: new Date().toLocaleDateString() });
            });
        }
        this.af.database.list(`/posts/${userId}`).push({name:name, text: postText, private: privatePost, date: new Date().toLocaleDateString() });
    }
    getUserPosts(userId: string) {
        return this.af.database.list(`/posts/${userId}`,{
            query:{
                limitToLast:8
            }
        }).map((result) => { return result.reverse()});
    }

}