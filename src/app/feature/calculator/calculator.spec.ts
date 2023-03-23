import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('AddNumbers method', () => {
    it('The addNumbers should return 4', () => {
      // const calculator = new Calculator();
      const result = calculator.addNumbers(3, 1);
      expect(result).toBe(4);
      expect(result).not.toBe(6);
    });

    it('The addNumbers should return -10', () => {
      // const calculator = new Calculator();
      const result = calculator.addNumbers(-20, 10);
      expect(result).toBe(-10);
      expect(result).not.toBe(15);
    });
  });

  describe('divideNumbers method', () => {
    it('The divideNumbers should return 10', () => {
      // const calculator = new Calculator();
      const result = calculator.divideNumbers(40, 4);
      expect(result).toBe(10);
      expect(result).not.toBe(1);
    });

    it('The divideNumbers should return null when dividing by zero', () => {
      // const calculator = new Calculator();
      const result = calculator.divideNumbers(10, 0);
      expect(result).toBeNull();
      expect(result).not.toBe(1);
    });
  });

  describe('subtractNumbers', () => {
    it('should return 5 as a promise', doneFn => {
      calculator.subtractNumbers(10, 5).then(result => {
        expect(result).toBe(5);
        expect(result).not.toBe(10);
        doneFn();
      });
    });

    it('should return 14 as a promise with async/await', async () => {
      const result = await calculator.subtractNumbers(21, 7);
      expect(result).toBe(14);
      expect(result).not.toBe(21);
    });
  });

  describe('multiplyNumbers', () => {
    it('should return 25 as an observable', doneFn => {
      calculator.multiplyNumbers(5, 5).subscribe(result => {
        expect(result).toBe(25);
        expect(result).not.toBe(10);
        doneFn();
      });
    });
  });
});
