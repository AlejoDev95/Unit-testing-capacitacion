import { TestBed } from '@angular/core/testing';
import { ImcService } from './imc.service';
import { MasterService } from './master.service';
import { IMCMockService } from '../../mock/imc.service.mock';

fdescribe('Master service', () => {
  let masterService: MasterService;
  let imcService: jasmine.SpyObj<ImcService>;

  beforeEach(() => {
    const imcServiceSpy = jasmine.createSpyObj('ImcService', ['calculateIMC']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ImcService, useValue: imcServiceSpy },
      ],
    });

    masterService = TestBed.inject(MasterService);
    imcService = TestBed.inject(ImcService) as jasmine.SpyObj<ImcService>;
  });

  xit('should call to calculateIMC from mock service', () => {
    const imcMockService = new IMCMockService();
    const masterService = new MasterService(imcMockService);
    expect(masterService.calculateIMC()).toBe('Fake value');
  });

  xit('should call to calculateIMC from object', () => {
    const fakeCalculateIMC = {
      calculateIMC: () => 'Fake value',
    };
    const masterService = new MasterService(fakeCalculateIMC as ImcService);
    expect(masterService.calculateIMC()).toBe('Fake value');
  });

  xit('should call to calculateIMC from imcService (local spy)', () => {
    const imcServiceSpy = jasmine.createSpyObj<ImcService>('ImcService', [
      'calculateIMC',
    ]);

    imcServiceSpy.calculateIMC.and.returnValue('Fake value');
    const masterService = new MasterService(imcServiceSpy);

    masterService.calculateIMC();
    expect(imcServiceSpy.calculateIMC).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(masterService).toBeTruthy();
  });

  it('should call to calculateIMC from imcService', () => {
    imcService.calculateIMC.and.returnValue('Fake value');
    masterService.calculateIMC();
    expect(imcService.calculateIMC).toHaveBeenCalled();
  });
});
