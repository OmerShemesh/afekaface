import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { FriendsService } from '../friends.service';
import { LoadingService } from '../loading/loading.service';
import { DateService } from '../date.service';
import { StorageService } from '../storage.service';

@Injectable()
export class PostsService {
    friends: Array<any>;
    constructor(private af: AngularFire, private fService: FriendsService, private loading: LoadingService, private dService: DateService, private sr: StorageService) {
        this.friends = fService.getFriends();

    }

    addPost(userId: string, name: string, postText: string, privatePost: boolean, pics) {
        
        this.loading.start();
        let urls = [];
        if(pics != [])
        {
           
            this.sr.uploadPostPics(pics, userId).subscribe((data: any) => {
                urls.push(data.snapshot.downloadURL);
            })
        }
       

        setTimeout(() => {
            let post = { user_id: userId, name: name, text: postText, private: privatePost, date: this.dService.convertTimestamp(Date.now()), photos: urls };
            let key = this.af.database.list(`timeline/${userId}`).push(post).getKey();
            let friends = this.fService.getFriends();
            this.af.database.object('/').update(this.fanoutPost( friends, post,key ));
            this.loading.stop();
        }, 2000);



    }
    fanoutPost(friends,post,postId) {
        let fanoutObject = {};
        friends.forEach(element => {
            fanoutObject[`timeline/${element.$key}/${postId}`] = post;
        });
        return fanoutObject;
    }


    getUserPosts(userId: string) {
        return this.af.database.list(`/timeline/${userId}`, {
            query: {
                limitToLast: 12,
                
            }
        }).map((result) => { return result.reverse() });
    }


    getPostPics(userId, postId) {
        return this.af.database.list(`/timeline/${userId}/${postId}/photos`);

    }


    getUserProfilePic(userId) {
        let profilepic = "";
        this.af.database.object(`users/${userId}`).subscribe((userData) => {
            profilepic = userData.profile_pic;
        })
        return profilepic;
    }






}