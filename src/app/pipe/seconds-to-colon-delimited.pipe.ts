import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToColonDelimited'
})
// Only supports HH:MM:SS
export class SecondsToColonDelimitedPipe implements PipeTransform {
  transform(seconds: number): string {
    const divisors = [ 1, 60, 3600 ];
    return divisors.reverse()
      // Side effects: seconds
      .map(divisor => {
        let value = 0;
        if (divisor <= seconds) {
          value = Math.floor(seconds / divisor);
          seconds %= divisor;
        }
        return value;
      })
      .reduce((colonDelimited, value) => {
        return (colonDelimited ? colonDelimited + ':' : '')
          + (
            colonDelimited
              ? ('' + value).padStart(2, '0')
              : value || ''
          );
      }, '');
  }
}
