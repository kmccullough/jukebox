import { DefaultSongQueueFactory } from './song-queue.factory';
import { Jukebox } from '../model/jukebox.model';
import {MusicalSection} from '../model/musical-section.model';
import {SongRequest} from '../model/song-request.model';

describe('DefaultSongQueueFactory', () => {
  let factory;

  beforeEach(() => {
    factory = new DefaultSongQueueFactory();
  });

  it('should create same number of queues as sections', () => {
    const sections = [];
    for (let i = 0; i < 5; ++i) {
      sections.push(new MusicalSection([], 0));
    }
    const queues = factory.createQueues(new Jukebox([], sections));
    expect(queues.length).toBe(5);
  });

  it('should index queues by 1', () => {
    const sections = [];
    for (let i = 0; i < 5; ++i) {
      sections.push(new MusicalSection([], 0));
    }
    const queues = factory.createQueues(new Jukebox([], sections));
    expect(queues.length).toBe(5);
    expect(queues[0].index).toBe(1);
    expect(queues[1].index).toBe(2);
    expect(queues[2].index).toBe(3);
    expect(queues[3].index).toBe(4);
    expect(queues[4].index).toBe(5);
  });

  it('should create queue matching section length', () => {
    const queues = factory.createQueues(
      new Jukebox(
        [new SongRequest('Song', 'Artist', 2, 'Man')],
        [new MusicalSection(['Man'], 10)]
      )
    );
    expect(queues.length).toBe(1);
    expect(queues[0].queue.length).toBe(5);
  });

  it('should create queue not exceeding section length', () => {
    const queues = factory.createQueues(
      new Jukebox(
        [new SongRequest('Song', 'Artist', 2, 'Man')],
        [new MusicalSection(['Man'], 9)]
      )
    );
    expect(queues.length).toBe(1);
    expect(queues[0].queue.length).toBe(4);
  });

  it('should create queues with attendees matching sections', () => {
    const queues = factory.createQueues(
      new Jukebox(
        [],
        [
          new MusicalSection(['1', '2'], 0),
          new MusicalSection(['3', '4'], 0),
        ]
      )
    );
    expect(queues.length).toBe(2);
    expect(queues[0].attendees).toEqual(['1', '2']);
    expect(queues[1].attendees).toEqual(['3', '4']);
  });

  it('should play a song from each requester before playing a second requester song', () => {
    const queues = factory.createQueues(
      new Jukebox(
        [
          new SongRequest('1', '2', 3, 'A'),
          new SongRequest('4', '5', 6, 'A'),
          new SongRequest('7', '8', 9, 'B'),
          new SongRequest('10', '11', 12, 'C'),
        ],
        [
          new MusicalSection(['A', 'B', 'C'], 3 + 9 + 12 + 6)
        ]
      )
    );
    expect(queues.length).toBe(1);
    const queue = queues[0].queue;
    expect(queue.length).toBe(4);

    const requesters = new Set();

    expect(requesters.has(queue[0].requester)).toBeFalsy();
    requesters.add(queue[0].requester);

    expect(requesters.has(queue[1].requester)).toBeFalsy();
    requesters.add(queue[1].requester);

    expect(requesters.has(queue[2].requester)).toBeFalsy();
    requesters.add(queue[2].requester);

    expect(requesters.has(queue[3].requester)).toBeTruthy();
  });

  it('should fill gap with short song', () => {
    const queues = factory.createQueues(
      new Jukebox(
        [
          new SongRequest('1', '2', 3, 'A'),
          new SongRequest('4', '5', 6, 'A'),
          new SongRequest('7', '8', 9, 'B'),
          new SongRequest('10', '11', 12, 'C'),
        ],
        [
          new MusicalSection(['A', 'B', 'C'], 3 + 9 + 12 + 3)
        ]
      )
    );
    expect(queues.length).toBe(1);
    const queue = queues[0].queue;
    expect(queue.length).toBe(4);

    const requests = new Set();

    expect(requests.has(queue[0].name)).toBeFalsy();
    requests.add(queue[0].name);

    expect(requests.has(queue[1].name)).toBeFalsy();
    requests.add(queue[1].name);

    expect(requests.has(queue[2].name)).toBeFalsy();
    requests.add(queue[2].name);

    expect(requests.has(queue[3].name)).toBeTruthy();
  });

  it('should exclude requests from non-attending requesters', () => {
    const queues = factory.createQueues(
      new Jukebox(
        [
          new SongRequest('Short Song', 'Shorty', 1, 'Gone')
        ],
        [
          new MusicalSection(['No Songs McGee'], 10)
        ]
      )
    );
    expect(queues.length).toBe(1); // MusicalSection Count
    expect(queues[0].queue.length).toBe(0); // Song Count
    expect(queues[0].length).toBe(0); // Total Queue Run-Time
  });
});
