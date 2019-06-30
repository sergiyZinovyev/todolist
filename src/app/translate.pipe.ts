import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './shared/translate.service';

@Pipe({
  name: 'translate',
  //pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private value: TranslateService 
  ) {}

  checkArrIdVal(array, val) {
    for (let i: number = 0; i < array.length; i++){
      if (array[i].id === val){
        return i;
      }
    }
    return undefined;
  }

  transform(value, arg) {
    let id = this.checkArrIdVal(this.value.dictionary, value);
    if (id >= 0){
      if(arg == 'ukr'){
        return this.value.dictionary[id].ukr;
      }
      else{return value}
    }
    return value
  }

}
