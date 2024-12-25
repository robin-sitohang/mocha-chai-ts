import { expect } from 'chai';
import { Calculator } from '../src/calculator';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('add', () => {
        it('should add two numbers correctly', () => {
            expect(calculator.add(2, 3)).to.equal(5);
        });
    });

    describe('subtract', () => {
        it('should subtract two numbers correctly', () => {
            expect(calculator.subtract(5, 3)).to.equal(2);
        });
    });

    describe('multiply', () => {
        it('should multiply two numbers correctly', () => {
            expect(calculator.multiply(4, 3)).to.equal(12);
        });
    });

    describe('divide', () => {
        it('should divide two numbers correctly', () => {
            expect(calculator.divide(6, 2)).to.equal(3);
        });

        it('should throw error when dividing by zero', () => {
            expect(() => calculator.divide(6, 0)).to.throw('Division by zero is not allowed');
        });
    });
});
