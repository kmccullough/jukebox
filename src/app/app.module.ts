import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ColonDelimitedToSecondsPipe } from './pipe/colon-delimited-to-seconds.pipe';
import { SecondsToColonDelimitedPipe } from './pipe/seconds-to-colon-delimited.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ColonDelimitedToSecondsPipe,
    SecondsToColonDelimitedPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
