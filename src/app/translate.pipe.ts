import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Pipe({
  name: 'translate',
  //pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private auth: AuthService, 
  ) {}

  dictionary: {id: string, ukr: string}[] = [
    {
      id: 'Achieve the unattainable!',
      ukr: 'Досягни недосяжне!'
    },
    {
      id: 'Set unachievable goals and achieve them. Create an unlimited number of task lists and manage them all at the same time',
      ukr: 'Встановюйте недосяжні цілі та досягайте їх. Створюйте необмежену кількість списків завдань та керуйте ними одночасно'
    }
  ]

  checkArrIdVal(array, val) {
    for (let i: number = 0; i < array.length; i++){
      if (array[i].id === val){
        return i;
      }
    }
    return undefined;
  }

  transform(value) {
    let id = this.checkArrIdVal(this.dictionary, value);
    if (id >= 0){
      if(this.auth.lang == 'ukr'){
        return this.dictionary[id].ukr;
      }
      else{return value}
    }
    return value
  }

}
