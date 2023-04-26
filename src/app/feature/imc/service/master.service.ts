import { Injectable } from '@angular/core';
import { ImcService } from './imc.service';

@Injectable()
export class MasterService {
  constructor(private imcService: ImcService) {}

  public calculateIMC(): string {
    const result = this.imcService.calculateIMC(88, 190);
    return result;
  }
}
