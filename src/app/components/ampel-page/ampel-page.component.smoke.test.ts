import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AmpelPageComponent } from './ampel-page.component';

const snackBarStub = {
  open: vi.fn(),
};

describe('AmpelPageComponent smoke test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AmpelPageComponent],
      providers: [{ provide: MatSnackBar, useValue: snackBarStub }],
    });
  });

  it('renders the traffic light controls', () => {
    // Arrange:
    const fixture = TestBed.createComponent(AmpelPageComponent);

    // Act:
    fixture.detectChanges();

    // Get the rendered DOM element.
    const renderedElement = fixture.nativeElement;

    // Assert:
    expect(renderedElement.textContent).toContain('Green');
    expect(renderedElement.textContent).toContain('Yellow');
    expect(renderedElement.textContent).toContain('Red');
    expect(renderedElement.textContent).toContain('Automatic');
  });
});
