import { Jukebox } from './jukebox.model';
import { MusicalSection } from './musical-section.model';
import { SongRequest } from './song-request.model';

describe('SongRequest Model', () => {
  it('should construct with properties', () => {
    const jukebox = new Jukebox(
      [new SongRequest('Name', 'Artist', 100, 'Requester')],
      [new MusicalSection(['Requester'], 200)]
    );
    expect(jukebox).toEqual(jasmine.objectContaining({
      requests: [new SongRequest('Name', 'Artist', 100, 'Requester')],
      sections: [new MusicalSection(['Requester'], 200)]
    }));
  });

  it('should construct fromJukeboxData', () => {
    const jukebox = Jukebox.fromJukeboxData({
      songs: [{
        song: 'Awesome',
        band: 'Bodacious',
        time: '5:00',
        owner: 'Cowabunga'
      }],
      availability: [{
        person: 'Cowabunga',
        sections: [ 2 ]
      }]
    });
    expect(jukebox).toEqual(jasmine.any(Jukebox));
    expect(jukebox).toEqual(jasmine.objectContaining({
      requests: [new SongRequest('Awesome', 'Bodacious', 300, 'Cowabunga')],
      sections: [
        new MusicalSection([], '30:00'),
        new MusicalSection(['Cowabunga'], '30:00')
      ]
    }));
  });

  it('should create queues with default song queue factory', () => {
    const jukebox = new Jukebox(
      [new SongRequest('D', 'E', 100, 'F')],
      [new MusicalSection(['Requester'], 200)]
    );
    const songQueueFactory = jasmine.createSpyObj('songQueueFactory', ['createQueues']);
    jukebox.createQueues(songQueueFactory);
    expect(songQueueFactory.createQueues).toHaveBeenCalledWith(jukebox);
  });
});
