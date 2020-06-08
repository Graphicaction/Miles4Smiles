import validateUpdate from './validateUpdate';

//Function to test the input is empty or not or if valid
describe('validate search query', () => {
  it(`should have function validateUpdate pass input that have valid characters`, () => {
    const input = validateUpdate(10, 10);
    expect(input).toBe(1);
  });

  it('should have function validateUpdate pass input that is empty', () => {
    const input = validateUpdate('', '');
    expect(input).toBe(0);
  });

  it('should have function validateUpdate pass input that does not have valid characters', () => {
    const input = validateUpdate('uy', 'Y5');
    expect(input).toBe(0);
  });
});
