import { SecondsToColonDelimitedPipe } from './seconds-to-colon-delimited.pipe';

describe('SecondsToColonDelimitedPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new SecondsToColonDelimitedPipe();
  });

  it('should transform 754 to 12:34', () => {
    expect(pipe.transform(754)).toEqual('12:34');
  });

  it('should transform 2601 to 43:21', () => {
    expect(pipe.transform(2601)).toEqual('43:21');
  });

  it('should transform 45296 to 12:34:56', () => {
    expect(pipe.transform(45296)).toEqual('12:34:56');
  });
});
