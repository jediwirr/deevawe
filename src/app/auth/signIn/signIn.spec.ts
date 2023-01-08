import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './signIn.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  beforeEach(async () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SignInComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind userName FormGroup', () => {
    const ctrl = component.sigInForm.get('email');
    const value = 'test@mail.com';
    ctrl?.setValue('test@mail.com');
    fixture.detectChanges(true);
    const nativEl = fixture.nativeElement;
    const emailField = nativEl.querySelector('input[formControlName=email]');
    console.log(emailField.value, 'CTRL');

    expect(emailField.value).toEqual(value);
  });
});
