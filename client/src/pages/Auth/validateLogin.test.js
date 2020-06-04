import validateLogin from './validateLogin';

//Function to test the input is empty or not
describe('validate search query', () => {
    it(`should have function validateLogin pass input that have valid characters`, () => {
        const input =  validateLogin("t1","t1");
        expect(input).toBe(1);
    });
     
    it('should have function validateLogin pass input that is empty', () => {
        const input = validateLogin("","");
        expect(input).toBe(0);
    });
});