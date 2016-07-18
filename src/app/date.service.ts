import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

    constructor() { }

     convertTimestamp(timestamp) 
     {
        var d = new Date(timestamp),	// Convert the passed timestamp to milliseconds
                yyyy = d.getFullYear(),
                mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
                dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
                hh = d.getHours(),
                h = hh,
                min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
                time;
                    
            // ie: 2013-02-18, 8:35 AM	
            time = dd + '/' + mm + '/' + yyyy + ', ' + h + ':' + min;      
            return time;
        }

}