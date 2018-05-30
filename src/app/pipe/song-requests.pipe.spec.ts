import { SongRequest } from '../model/song-request.model';
import { SongRequestsPipe } from './song-requests.pipe';

describe('SongRequestPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new SongRequestsPipe();
  });

  it('should transform song-requests to string array with default format', () => {
    expect(
      pipe.transform([
        new SongRequest('Name 1', 'Artist 1', 12, 'Requester 1'),
        new SongRequest('Name 2', 'Artist 2', 23, 'Requester 2'),
      ])
    ).toEqual([
      '1. Name 1 - Artist 1',
      '2. Name 2 - Artist 2',
    ]);
  });

  it('should transform song-requests to string array with given format', () => {
    expect(
      pipe.transform(
        [
          new SongRequest('Name 3', 'Artist 3', 123, 'Requester 3'),
          new SongRequest('Name 4', 'Artist 4', 234, 'Requester 4'),
        ],
        '%i. %n - %a (%r) [%l/%t]',
      )
    ).toEqual([
      '1. Name 3 - Artist 3 (Requester 3) [123/2:03]',
      '2. Name 4 - Artist 4 (Requester 4) [234/3:54]'
    ]);
  });

  it('should transform song-requests to string with given format and delimiter', () => {
    expect(
      pipe.transform(
        [
          new SongRequest('Name 5', 'Artist 5', 5, 'Requester 5'),
          new SongRequest('Name 6', 'Artist 6', 6, 'Requester 6'),
        ],
        '%i. %n - %a (%r) [%l/%t]',
        `\n`
      )
    ).toEqual(
      `1. Name 5 - Artist 5 (Requester 5) [5/5]\n2. Name 6 - Artist 6 (Requester 6) [6/6]`
    );
  });
});
