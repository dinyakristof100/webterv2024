import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string | null, format: string = 'yyyy-mm-dd'): string {
    if (!value) return '';

    let date = value;

    // Ensure the value is a Date object
    if (typeof value === 'string') {
      date = new Date(value);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }

    const pad = (num: number) => num < 10 ? `0${num}` : num.toString();

    let year = date.getFullYear();
    let month = pad(date.getMonth() + 1);  // getMonth is zero-indexed
    let day = pad(date.getDate());

    // Adjust the format based on the input
    if (format === 'yyyy-mm-dd') {
      return `${year}-${month}-${day}`;
    } else if (format === 'dd-mm-yyyy') {
      return `${day}-${month}-${year}`;
    } else {
      // Default format
      return `${year}-${month}-${day}`;
    }
  }
}
