import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaPage } from './reserva.page'; // Cambié "RecerbaPage" a "ReservaPage"

describe('ReservaPage', () => { // Cambié "RecerbaPage" a "ReservaPage"
  let component: ReservaPage;
  let fixture: ComponentFixture<ReservaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

