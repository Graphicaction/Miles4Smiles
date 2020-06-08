import validatePostData from './validatePostData';

//Function to test the input is empty or not
describe('validate search query', () => {
  it(`should have function validatePostData pass input that have valid data also decimal`, () => {
    const input = validatePostData('Cary', 'NC', 10.2, 11.22);
    expect(input).toBe(1);
  });

  it('should have function validatePostData pass input that is empty', () => {
    const input = validatePostData('', '', '', '');
    expect(input).toBe(0);
  });

  it('should have function validatePostData pass input that does not have valid data', () => {
    const input = validatePostData('Cary', 'NC', '*7', 'Y%');
    expect(input).toBe(0);
  });
});
