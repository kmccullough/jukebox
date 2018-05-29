import { ColonDelimitedToSecondsPipe } from './colon-delimited-to-seconds.pipe';

describe('ColonDelimitedToSecondsPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ColonDelimitedToSecondsPipe();
  });

  it('should transform 12:34 to 754', () => {
    expect(pipe.transform('12:34')).toEqual(754);
  });

  it('should transform 43:21 to 2601', () => {
    expect(pipe.transform('43:21')).toEqual(2601);
  });

  it('should transform 12:34:56 to 45296', () => {
    expect(pipe.transform('12:34:56')).toEqual(45296);
  });
});
