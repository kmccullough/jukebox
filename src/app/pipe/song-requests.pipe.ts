import { Pipe, PipeTransform } from '@angular/core';
import { SongRequest } from '../model/song-request.model';
import { SongRequestPipe } from './song-request.pipe';

const songRequestPipe = new SongRequestPipe();

const tokens = {
  i: (r: SongRequest, i: number) => i + 1,
};
const matchTokens = new RegExp('%[' + Object.keys(tokens).join('') + ']', 'g');

@Pipe({
  name: 'songRequests'
})
export class SongRequestsPipe implements PipeTransform {
  transform(requests: SongRequest[], format = '%i. %n - %a', delimiter?: string): string[] | string {
    const requestStrings = requests.map((request, i) =>
      songRequestPipe.transform(
        request,
        format.replace(matchTokens, token => tokens[token.charAt(1)](request, i))
      )
    );
    return delimiter ? requestStrings.join(delimiter) : requestStrings;
  }
}
