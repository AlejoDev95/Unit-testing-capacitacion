import { Observable, of } from 'rxjs';

export class Calculator {
  public addNumbers = (num1: number, num2: number): number => num1 + num2;

  public divideNumbers = (num1: number, num2: number): number => num1 / num2;

  public async subtractNumbers(num1: number, num2: number): Promise<number> {
    return num1 - num2;
  }

  public multiplyNumbers(num1: number, num2: number): Observable<number> {
    return of(num1 * num2);
  }
}
