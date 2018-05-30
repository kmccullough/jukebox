import { SongQueue } from './song-queue.model';
import { SongRequest } from './song-request.model';

describe('SongQueue Model', () => {
  it('should construct with properties', () => {
    const queue = new SongQueue(
      123,
      [
        new SongRequest('A Song', 'A Guy', 234, 'Alice'),
        new SongRequest('A Better Song', 'A Clone Guy', 345, 'Betty'),
      ],
      ['Diane', 'Elsa', 'Flo'],
    );
    expect(queue).toEqual(jasmine.objectContaining({
      index: 123,
      queue: [
        new SongRequest('A Song', 'A Guy', 234, 'Alice'),
        new SongRequest('A Better Song', 'A Clone Guy', 345, 'Betty'),
      ],
      attendees: ['Diane', 'Elsa', 'Flo'],
      length: 234 + 345,
    }));
  });
});
