import validateChallenge from './validateChallenge';

//Function to test the input is empty or not
describe('validate search query', () => {
  it(`should have function validateSignup pass input that have valid characters`, () => {
    const input = validateChallenge('t1', 10, 10, 'Total dairy');
    expect(input).toBe(1);
  });

  it('should have function validateSignup pass input that is empty', () => {
    const input = validateChallenge('', '', '', '');
    expect(input).toBe(0);
  });

  it('should have function validateSignup pass input that does not have valid characters', () => {
    const input = validateChallenge('$#', '&8', '*7', 'Y%');
    expect(input).toBe(0);
  });
});
