import validateSignup from './validateSignup';

//Function to test the input is empty or not
describe('validate search query', () => {
    it(`should have function validateSignup pass input that have valid characters`, () => {
        const input =  validateSignup("er");
        expect(input).toBe(1);
    });
     
    it('should have function validateSignup pass input that is empty', () => {
        const input = validateSignup("");
        expect(input).toBe(0);
    });

    it('should have function validateSignup pass input that does not have valid characters', () => {
        const input = validateSignup("$#");
        expect(input).toBe(0);
    });
  });