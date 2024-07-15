import { BsModalService } from 'ngx-bootstrap/modal';
import { CowSalesComponent } from './cow-sales.component';
import * as angularCore from '@angular/core';

describe('CowSalesComponent', () => {
  let component: CowSalesComponent;
  const injectSpy = jest.spyOn(angularCore, 'inject');

  const mockModalService = {
    show: jest.fn()
  }

  const setupSpy = (mockModalService: unknown) => {
    injectSpy.mockImplementation((providerToken: unknown) => {
      if (providerToken === BsModalService) {
        return mockModalService;
      }
    });

    return new CowSalesComponent();
  };

  beforeEach(() => {
    injectSpy.mockReset();

    component = setupSpy(mockModalService as unknown);

    jest.clearAllMocks();
  });

  afterAll(() => {
    injectSpy.mockRestore();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
