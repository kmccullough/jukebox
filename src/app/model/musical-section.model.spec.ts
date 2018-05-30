import { MusicalSection } from './musical-section.model';

describe('MusicalSection Model', () => {
  it('should construct with properties', () => {
    const section = new MusicalSection(['Abe', 'Bob', 'Cal'], 246);
    expect(section).toEqual(jasmine.objectContaining({
      attendees: ['Abe', 'Bob', 'Cal'],
      length: 246
    }));
  });
});
