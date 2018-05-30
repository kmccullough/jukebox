import { Component, OnInit } from '@angular/core';

import jukeboxData from '../data/jukebox.json';
import { Jukebox } from './model/jukebox.model';
import { SongRequestsPipe } from './pipe/song-requests.pipe';
import { SecondsToColonDelimitedPipe } from './pipe/seconds-to-colon-delimited.pipe';

const secondsToColonDelimitedPipe = new SecondsToColonDelimitedPipe();
const songRequestsPipe = new SongRequestsPipe();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    console.log('Data:', { ...Jukebox.defaults, ...jukeboxData });
    const jukebox = Jukebox.fromJukeboxData(jukeboxData);
    console.log('Jukebox:', jukebox);
    console.log('Queues:',
      jukebox.createQueues()
        .map(queue => ({
          sectionIndex: queue.index,
          attendees: queue.attendees,
          songQueue: songRequestsPipe.transform(queue.queue),
          songQueueDetail: songRequestsPipe.transform(queue.queue, '%n [%t] (%r)'),
          totalLength: secondsToColonDelimitedPipe.transform(queue.length)
        }))
    );
  }
}
