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
        //this.friends = fService.getFriends();

    }

    addPost(userId: string, name: string, postText: string, privatePost: boolean, pics) {

        this.loading.start();
        let urls = [];

        if (pics.length > 0) {

            this.sr.uploadPostPics(pics, userId).subscribe((data: any) => {
                urls.push(data.snapshot.downloadURL);
                if (pics.length == urls.length) {
                    let post = { user_id: userId, name: name, text: postText, private: privatePost, date: this.dService.convertTimestamp(Date.now()), photos: urls,likes:{value:0,liked:false} };
                    let key = this.af.database.list(`timeline/${userId}`).push(post).getKey();
                    let friends = this.fService.getFriends();
                    this.af.database.object('/').update(this.fanoutPost(friends, post, key));
                    this.loading.stop();
                }
            })
        }
        else {
            setTimeout(() => {
                let post = { user_id: userId, name: name, text: postText, private: privatePost, date: this.dService.convertTimestamp(Date.now()),likes:{value:0,liked:false}  };
                let key = this.af.database.list(`timeline/${userId}`).push(post).getKey();
                let friends = this.fService.getFriends();
                this.af.database.object('/').update(this.fanoutPost(friends, post, key));
                this.loading.stop();
            }, 2000)

        }





    }
    fanoutPost(friends, post, postId) {
        let fanoutObject = {};
        friends.forEach(element => {
            fanoutObject[`timeline/${element.$key}/${postId}`] = post;
        });
        return fanoutObject;
    }

    removePost(postId, userId) {
        let friends = this.fService.getFriends();
        this.af.database.object('/').update(this.fanoutRemovePosts(userId, friends, postId));
    }

    fanoutRemovePosts(userId, friends, postId) {
        let fanoutObject = {};
        fanoutObject[`timeline/${userId}/${postId}`] = null;
        friends.forEach(element => {
            fanoutObject[`timeline/${element.$key}/${postId}`] = null;
        });
        return fanoutObject;
    }

    

    getPostLikes(post_writer,postId){
        let likes:number = 0;
        this.af.database.object(`timeline/${post_writer}/${postId}/likes`).subscribe((val)=>{
            likes = val.value;
        });

        return likes;
    }
    likePost(postId,post_writer,userId){
        let friends = this.fService.getPostFriends(post_writer);   
        let likes:number = this.getPostLikes(userId,postId);
        this.af.database.object(`timeline/${post_writer}/${postId}/likes/value`).set(likes+1);
        this.af.database.object(`timeline/${userId}/${postId}/likes`).update({value:likes+1,liked:true});
        this.af.database.object('/').update(this.fanoutLike(likes,postId,friends));
    }
    fanoutLike(likes,postId,friends){
        let fanoutObject = {};
        friends.forEach(element => {
              fanoutObject[`timeline/${element.$key}/${postId}/likes/value`] = likes+1;
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
    changePostPermissions(postId, userId, value) {
        let friends = this.fService.getFriends();
        this.af.database.object(`/timeline/${userId}/${postId}`).update({ private: value });
        friends.forEach(element => {
            this.af.database.object(`timeline/${element.$key}/${postId}`).update({ private: value });
        });
    }
    
    





}