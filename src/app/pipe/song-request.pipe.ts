import { Pipe, PipeTransform } from '@angular/core';
import { SongRequest } from '../model/song-request.model';
import { SecondsToColonDelimitedPipe } from './seconds-to-colon-delimited.pipe';

const secondsToColonDelimited = new SecondsToColonDelimitedPipe();

const tokens = {
  a: (r: SongRequest) => r.artist,
  l: (r: SongRequest) => r.length,
  n: (r: SongRequest) => r.name,
  r: (r: SongRequest) => r.requester,
  t: (r: SongRequest) => secondsToColonDelimited.transform(r.length),
};
const matchTokens = new RegExp('%[' + Object.keys(tokens).join('') + ']', 'g');

@Pipe({
  name: 'songRequest'
})
export class SongRequestPipe implements PipeTransform {
  transform(request: SongRequest, format = '%n - %a'): string {
    return format.replace(matchTokens, token => tokens[token.charAt(1)](request));
  }
}
