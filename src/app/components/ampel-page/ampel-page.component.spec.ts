import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AmpelLicht } from '../../models/ampel-licht';
import { AmpelPageComponent } from './ampel-page.component';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

const snackBarStub = {
  open: vi.fn(),
};

describe('AmpelPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AmpelPageComponent],
      providers: [{ provide: MatSnackBar, useValue: snackBarStub }],
    });
  });

  function createComponent() {
    const fixture = TestBed.createComponent(AmpelPageComponent);
    return fixture.componentInstance;
  }

  it('starts with no active light', () => {
    // Arrange:
    const component = createComponent();
    // Act:

    // Assert:
    expect(component.aktuellesAmpelLicht()).toBe(AmpelLicht.None);
  });

  it('switches the red light on manually', () => {
    // Arrange:
    const component = createComponent();

    // Act:
    component.onRed();

    // Assert:
    expect(component.aktuellesAmpelLicht()).toBe(AmpelLicht.Red);
  });

  it('switches the yellow light on manually', () => {
    // Arrange:
    const component = createComponent();

    // Act:
    component.onYellow();

    // Assert:
    expect(component.aktuellesAmpelLicht()).toBe(AmpelLicht.Yellow);
  });

  it('switches the green light on manually', () => {
    // Arrange:
    const component = createComponent();

    // Act:
    component.onGreen();

    // Assert:
    expect(component.aktuellesAmpelLicht()).toBe(AmpelLicht.Green);
  });
});
