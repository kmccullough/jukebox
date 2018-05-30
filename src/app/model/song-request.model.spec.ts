import { SongRequest } from './song-request.model';

describe('SongRequest Model', () => {
  it('should construct with properties', () => {
    const request = new SongRequest(
      'Song Name',
      'Song Artist',
      123,
      'Requester Name'
    );
    expect(request).toEqual(jasmine.objectContaining({
      name: 'Song Name',
      artist: 'Song Artist',
      length: 123,
      requester: 'Requester Name'
    }));
  });

  it('should construct fromSongData', () => {
    const request = SongRequest.fromSongData({
      song: 'Another Song',
      band: 'Another Artist',
      time: '34:56',
      owner: 'Another Requester'
    });
    expect(request).toEqual(jasmine.any(SongRequest));
    expect(request).toEqual(jasmine.objectContaining({
      name: 'Another Song',
      artist: 'Another Artist',
      length: 2096,
      requester: 'Another Requester'
    }));
  });
});
