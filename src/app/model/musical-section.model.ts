import { ColonDelimitedToSecondsPipe } from '../pipe/colon-delimited-to-seconds.pipe';

const colonDelimitedToSecondsPipe = new ColonDelimitedToSecondsPipe();

export class MusicalSection {
  length: number;
  constructor(
    public attendees: string[],
    length: number | string
  ) {
    if (('' + length).indexOf(':') >= 0) {
      length = colonDelimitedToSecondsPipe
        .transform(length as string);
    }
    this.length = length as number;
  }
}
