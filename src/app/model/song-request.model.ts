import { ColonDelimitedToSecondsPipe } from '../pipe/colon-delimited-to-seconds.pipe';

export class SongData {
  song: string;
  band: string;
  time: string;
  owner: string;
}

export class SongRequest {
  constructor(
    public name: string,
    public artist: string,
    public length: number,
    public requester: string,
  ) {
  }

  static fromSongData(data: SongData ) {
    return new SongRequest(
      data.song,
      data.band,
      (new ColonDelimitedToSecondsPipe()).transform(data.time),
      data.owner
    );
  }
}
