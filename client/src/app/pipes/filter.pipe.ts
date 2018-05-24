import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    const myPattern = new RegExp(value, 'i');
    return items.filter(it => it[field].match(myPattern));
  }
 
  //   transform(items: any[], searchTerm: string): any[] {
  //     if(!items) return [];
  //     if(!searchTerm) return items;
  // searchTerm = searchTerm.toLowerCase();
  //     return items.filter( it => {
  //       return it.type.toLowerCase().includes(searchTerm);
  //     });
  //    }
}
