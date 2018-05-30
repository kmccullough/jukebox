import { SongRequest } from './song-request.model';

export class SongQueue {
  length: number;
  constructor(
    public index: number,
    public queue: SongRequest[],
    public attendees: string[]
  ) {
    this.length = queue.reduce((length, song) => length + song.length, 0);
  }
}
