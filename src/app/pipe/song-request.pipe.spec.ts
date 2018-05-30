import { SongRequest } from '../model/song-request.model';
import { SongRequestPipe } from './song-request.pipe';

describe('SongRequestPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new SongRequestPipe();
  });

  it('should transform song-request to string with default format', () => {
    expect(
      pipe.transform(new SongRequest('My Song', 'My Guy', 987, 'My Name'))
    ).toEqual('My Song - My Guy');
  });

  it('should transform song-request to string with given format', () => {
    expect(
      pipe.transform(
        new SongRequest('My Song', 'My Guy', 987, 'My Name'),
        '%n - %a (%r) [%l/%t]',
      )
    ).toEqual('My Song - My Guy (My Name) [987/16:27]');
  });
});
