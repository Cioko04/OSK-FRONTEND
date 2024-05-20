import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToBr',
})
export class NewlineToBrPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? value.replace(/\n/g, '<br>') : '';
  }
}
