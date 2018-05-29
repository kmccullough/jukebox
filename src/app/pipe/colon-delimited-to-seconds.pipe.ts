import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colonDelimitedToSeconds'
})
// Only supports HH:MM:SS
export class ColonDelimitedToSecondsPipe implements PipeTransform {
  transform(colonDelimited: string): number {
    const multipliers = [ 1, 60, 3600 ];
    return colonDelimited.split(':').reverse()
      .reduce((totalSeconds, value, i) => {
        return totalSeconds + +value * multipliers[i];
      }, 0);
  }
}
