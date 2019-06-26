import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtr'
})
export class FiltrPipe implements PipeTransform {

  transform(array, args?: {direct: string, column: string}) {
    if(args.direct == 'desc'){
      return array.sort((a, b) => {
        if (a[args.column] > b[args.column]) return -1;
        if (a[args.column] < b[args.column]) return 1;
      });
    }

    if(args.direct == 'asc'){
      return array.sort((a, b) => {
        if (a[args.column] > b[args.column]) return 1;
        if (a[args.column] < b[args.column]) return -1;
      });
    }

  }

}
