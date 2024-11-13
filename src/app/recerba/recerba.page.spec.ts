import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecerbaPage } from './recerba.page';

describe('RecerbaPage', () => {
  let component: RecerbaPage;
  let fixture: ComponentFixture<RecerbaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecerbaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
