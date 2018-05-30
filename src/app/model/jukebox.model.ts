import { ColonDelimitedToSecondsPipe } from '../pipe/colon-delimited-to-seconds.pipe';
import { MusicalSection } from './musical-section.model';
import { SongData, SongRequest } from './song-request.model';
import { SongQueue } from './song-queue.model';
import { DefaultSongQueueFactory, SongQueueFactory } from '../factory/song-queue.factory';

export class AvailabilityData {
  person: string;
  sections: number[];
}

export class JukeboxData {
  songs: SongData[];
  availability: AvailabilityData[];
  sectionCount?: number;
  defaultSectionLength?: string | number;
}

export class Jukebox {
  constructor(
    public requests: SongRequest[],
    public sections: MusicalSection[]
  ) {
  }

  static defaults = {
    defaultSectionLength: '30:00',
    sectionCount: 2
  };

  static fromJukeboxData(data: JukeboxData) {
    // Song requests
    const requests = (data.songs || []).map(SongRequest.fromSongData);
    // Number of indexed sections to create
    const sectionCount = data.sectionCount || Jukebox.defaults.sectionCount;
    // Default section length; default: 30mins
    let defaultSectionLength = (data.defaultSectionLength || Jukebox.defaults.defaultSectionLength);
    if (('' + defaultSectionLength).indexOf(':') >= 0) {
      defaultSectionLength = (new ColonDelimitedToSecondsPipe())
        .transform(defaultSectionLength as string);
    }
    // Map availability to section attendee sets
    const sectionAttendees = [];
    for (let i = 0; i < sectionCount; ++i) {
      sectionAttendees.push(new Set());
    }
    data.availability.forEach(availability =>
      availability.sections.forEach(index => {
        --index;
        if (index >= 0 && index < sectionAttendees.length) {
          sectionAttendees[index].add(availability.person);
        }
      })
    );
    // Map section attendee sets to musical-sections
    const sections = sectionAttendees.map(attendees =>
      new MusicalSection(Array.from(attendees), defaultSectionLength as number)
    );

    return new Jukebox(requests, sections);
  }

  // Warning: Can't test this instantiated default
  createQueues(songQueueFactory: SongQueueFactory = new DefaultSongQueueFactory()): SongQueue[] {
    return songQueueFactory.createQueues(this);
  }
}
