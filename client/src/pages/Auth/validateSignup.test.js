import validateSignup from './validateSignup';

//Function to test the input is empty or not
describe('validate search query', () => {
  it(`should have function validateSignup pass input that have valid data`, () => {
    const input = validateSignup('t1', 't1', 'mike123', 'mike123','mike123');
    expect(input).toBe(1);
  });

  it(`should have function validateSignup pass input that do not have same values in password and confirmpassword`, () => {
    const input = validateSignup('t1', 't1', 'john123', 'john123','john12');
    expect(input).toBe(0);
  });

  it('should have function validateSignup pass input that is empty', () => {
    const input = validateSignup('', '', '', '', '');
    expect(input).toBe(0);
  });

  it('should have function validateSignup pass input that does not have valid characters', () => {
    const input = validateSignup('$#', '&8', '*7jahs8s', 'Y%87aj', 'Y%82gs7');
    expect(input).toBe(0);
  });

  it('should have function validateSignup to have username and password atleast 6 characters long', () => {
    const input = validateSignup('mike', 'johnson', 'mike123', 'mike123', 'mike123');
    expect(input).toBe(1);
  });

  it('should have function validateSignup that does not have username and password atleast 6 characters long', () => {
    const input = validateSignup('mike', 'johnson', 'mike123', 'mike', 'mike');
    expect(input).toBe(0);
  });

});
