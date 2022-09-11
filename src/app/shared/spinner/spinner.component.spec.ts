import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SpinnerComponent);
      });
  }));

  it('should create the spinner component', () => {
    expect(fixture.componentInstance)
      .withContext('Spinner component not found')
      .toBeTruthy();
  });
});
