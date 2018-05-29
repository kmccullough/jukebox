1. Model representations of:
    * Song
        * Properties
            * Song Name (song): string
            * Band Name (band): string
            * Song Length (time): string
            * Requester (owner): string
    * Availability
        * Properties
            * Song Name (person): string
            * Band Name (sections): number[]
    * Section
        * Properties
            * Max Length (seconds): number
            * Requests: Song[]
        * Methods
            * Create SectionQueue
    * SectionQueue
        * Properties
            * Songs: Song[]
1. Pipes:
    * Colon Delimited Time Length -> Length in Seconds
    * SectionQueue::Song -> "\[QueueIndex]. \[Song Name] - \[Band Name]"
1. Configuration:
    * 2 Sections initialized to 30 minutes
1. Rules
    * Each section is an independent list that doesn't impact any other section.
        * Satisfy each song requester and section length in each section as best as possible; don't try to make up for it in later sections, if everyone cannot be satisfied; don't worry about repeating songs between sections.
    * There is no priority or order between the team members.
        * Order based on other rules and available time.
    * Play a song from each person before another song from the same person.
        * Don't worry for now about continuing this pattern past everyone's first song per section.
    * Having a period of time at the end of a section where no music is playing is acceptable, but we would prefer hearing another song if it would fit. Songs should not be scheduled if they will not finish playing within the 30 minute time
boundary.
        * Sections should end as close as possible to, without exceeding, the section length. This is important; we need our quiet time!
1. Output array of songs for each section
1. Filter array of songs to prefix with number et al formatting
1. Tests:
    * Section
        * play length
            * should not exceed section length (may need to be a general assertion in other tests, to cover different scenarios)
        * queued songs
            * should include at least one for each person

