import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value:any , prefix:string,currentUser:string): any {
        if(value == null)
        {
            return null;
        }
        return value.filter((item)=>{
            if(prefix == "*")
            {
                return item.$key != currentUser;
            }
            else
                return item.name.toLowerCase().startsWith(prefix.toLowerCase()) && item.$key != currentUser && prefix !== "";
        });
    }

  
}