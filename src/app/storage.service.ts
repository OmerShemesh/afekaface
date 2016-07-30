import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

declare var firebase: any;

@Injectable()
export class StorageService {

    storage;
    storageRef;
    usersRef;
    constructor() {

        this.storage = firebase.storage();
        this.storageRef = this.storage.ref();
    }
    uploadProfilePic(photo, userId) {
        return new Observable(observer => {
            var uploadTask = this.storageRef.child(`users/${userId}/profile_pic/${photo.name}`).put(photo);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // See below for more detail
            }, function (error) {
                // Handle unsuccessful uploads
                observer.error(error);
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                var downloadURL = uploadTask.snapshot.downloadURL;
                var ref = firebase.database().ref(`users/${userId}`).update({ profile_pic: downloadURL });
                observer.next(uploadTask);
            });
        });
    }

    uploadPostPics(photos,userId) {
        return new Observable(observer => {
            photos.forEach(element => {
                var uploadTask = this.storageRef.child(`users/${userId}/${element.name}`).put(element);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // See below for more detail
                }, function (error) {
                    // Handle unsuccessful uploads
                    observer.error(error);
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    observer.next(uploadTask);
                });
            });
        });

    }


}