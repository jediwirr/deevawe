import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeOfday',
    pure: false,
})
export class TimeOfDay implements PipeTransform {

    public transform(type: number): any {

      if(type >= 8 && type <=12){
        return 'Утро'
      }
      if(type >= 12 && type <=18){
        return 'День'
      }
      if(type >= 18 && type >=0){
        return 'Вечер'
      }
      if(String(type) === '0') {
        return 'Вечер'
      }
      if(type >= 1 && type <=7){
        return 'Ночь'
      }
      
    }
}
