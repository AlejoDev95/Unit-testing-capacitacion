import { TestBed } from '@angular/core/testing';
import { ImcService } from './imc.service';

describe('Description', () => {
  let imcService: ImcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImcService],
    });
    imcService = TestBed.inject(ImcService);
  });

  it('should create', () => {
    expect(imcService).toBeTruthy();
  });

  it('should return a string: down', () => {
    const result = imcService.calculateIMC(40, 1.68);
    expect(result).toBe('down');
    expect(result).not.toBe('normal');
  });

  it('should return a string: normal', () => {
    const result = imcService.calculateIMC(58, 1.68);
    expect(result).toBe('normal');
    expect(result).not.toBe('overweight');
  });

  it('should return a string: overweight', () => {
    const result = imcService.calculateIMC(70, 1.68);
    expect(result).toBe('overweight');
    expect(result).not.toBe('overweight level 1');
  });

  it('should return a string: overweight level 1', () => {
    const result = imcService.calculateIMC(78, 1.68);
    expect(result).toBe('overweight level 1');
    expect(result).not.toBe('overweight level 2');
  });

  it('should return a string: overweight level 2', () => {
    const result = imcService.calculateIMC(84, 1.68);
    expect(result).toBe('overweight level 2');
    expect(result).not.toBe('overweight level 3');
  });

  it('should return a string: overweight level 3', () => {
    const result = imcService.calculateIMC(120, 1.68);
    expect(result).toBe('overweight level 3');
    expect(result).not.toBe('Not found');
  });

  it('should return a string: Not found', () => {
    const result = imcService.calculateIMC(-50, 1.68);
    expect(result).toBe('Not found');
    expect(result).not.toBe('normal');
  });
});
