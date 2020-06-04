import validateRun from './validateRun';

//Function to test the input is empty or not
describe('validate search query', () => {
    it(`should have function validateSignup pass input that have valid characters`, () => {
        const input =  validateRun(10,"2020-06-03",60);
        expect(input).toBe(1);
    });
     
    it('should have function validateSignup pass input that is empty', () => {
        const input = validateRun("","","");
        expect(input).toBe(0);
    });

    it('should have function validateSignup pass input that does not have valid characters', () => {
        const input = validateRun(10,"2020-06-03","Y5");
        expect(input).toBe(0);
    });
  });