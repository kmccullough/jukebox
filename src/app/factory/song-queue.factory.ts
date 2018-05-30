import { Jukebox } from '../model/jukebox.model';
import { MusicalSection } from '../model/musical-section.model';
import { SongQueue } from '../model/song-queue.model';

export interface SongQueueFactory {
  createQueues(jukebox: Jukebox): SongQueue[];
}

export class NiceSongQueueFactoryV1 implements SongQueueFactory {
  createQueues(jukebox: Jukebox): SongQueue[] {
    return jukebox.sections.map((section: MusicalSection, i) => {
      const queue = [];

      // Songs for present attendees
      const requests = jukebox.requests
        .filter(r => section.attendees.includes(r.requester));

      // Attendees with song requests
      const attendeeSet = new Set();
      requests.forEach(r => attendeeSet.add(r.requester));
      const attendees = Array.from(attendeeSet);

      // Requests indexed by attendee
      const requestsByAttendee = {};
      section.attendees.forEach(attendee =>
        requestsByAttendee[attendee] = requests.filter(r => r.requester === attendee)
      );

      let length = 0;
      let done = false;
      while (!done && attendees.length && length <= section.length) {
        let nextSong;

        // Iterate through attendees until an appropriate song can be found
        for (let iA = 0; iA < attendees.length && !nextSong; ++iA) {
          // Rotate attendees
          const attendee = attendees.shift();
          attendees.push(attendee);
          const rba = requestsByAttendee[attendee];

          // Iterate through attendee's songs until an appropriate song can be found
          for (let iR = 0; iR < rba.length && !nextSong; ++iR) {
            // Rotate attendee's requests
            const request = rba.shift();
            rba.push(request);
            // Maintain silence after section length!
            if (length + request.length <= section.length) {
              nextSong = request;
            }
          }
        }

        if (nextSong) {
          // Play attendee's next song
          queue.push(nextSong);
          length += nextSong.length;
        } else {
          done = true;
        }
      }

      return new SongQueue(i + 1, queue, section.attendees);
    });
  }
}

export class DefaultSongQueueFactory extends NiceSongQueueFactoryV1 {
}
