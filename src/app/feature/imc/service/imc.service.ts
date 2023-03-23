import { Injectable } from '@angular/core';

@Injectable()
export class ImcService {
  public calculateIMC(weight: number, height: number): string {
    const result = Math.round(weight / height ** 2);

    if (result >= 0 && result <= 18) return 'down';

    if (result >= 19 && result <= 24) return 'normal';

    if (result >= 25 && result <= 26) return 'overweight';

    if (result >= 27 && result <= 29) return 'overweight level 1';

    if (result >= 30 && result <= 39) return 'overweight level 2';

    if (result > 40) return 'overweight level 3';

    return 'Not found';
  }
}
