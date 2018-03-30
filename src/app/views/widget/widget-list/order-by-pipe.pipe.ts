import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByPipe'
})
export class OrderByPipePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.position < b.position) {
        return -1;
      } else if (a.position > b.position) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
