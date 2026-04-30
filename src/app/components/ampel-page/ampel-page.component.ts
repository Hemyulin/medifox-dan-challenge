import { Component, signal, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmpelControlComponent } from '../ampel-control/ampel-control.component';
import { AmpelLicht } from '../../models/ampel-licht';

@Component({
  selector: 'app-ampel-page',
  imports: [MatButtonModule, MatCardModule, AmpelControlComponent],
  templateUrl: './ampel-page.component.html',
  styleUrl: './ampel-page.component.css',
})
export class AmpelPageComponent implements OnDestroy {
  private readonly snackBar = inject(MatSnackBar);
  private automaticInterval: ReturnType<typeof setInterval> | null = null;

  aktuellesAmpelLicht = signal<AmpelLicht>(AmpelLicht.None);

  setLight(light: AmpelLicht): void {
    this.aktuellesAmpelLicht.set(light);
    this.stopAutomatic();
  }

  onGreen(): void {
    this.setLight(AmpelLicht.Green);
  }

  onYellow(): void {
    this.setLight(AmpelLicht.Yellow);
  }

  onRed(): void {
    this.setLight(AmpelLicht.Red);
  }

  onAutomatic(): void {
    try {
      if (this.automaticInterval !== null) {
        this.stopAutomatic();
        return;
      }

      const lights = [AmpelLicht.Red, AmpelLicht.Yellow, AmpelLicht.Green];
      this.aktuellesAmpelLicht.set(lights[Math.floor(Math.random() * lights.length)]);

      this.automaticInterval = setInterval(() => {
        this.aktuellesAmpelLicht.set(lights[Math.floor(Math.random() * lights.length)]);
      }, 1000);
    } catch (e: unknown) {
      this.snackBar.open((e as Error).message, 'OK', { duration: 3000 });
    }
  }

  private stopAutomatic(): void {
    if (this.automaticInterval !== null) {
      clearInterval(this.automaticInterval);
      this.automaticInterval = null;
    }
  }

  ngOnDestroy(): void {
    this.stopAutomatic();
  }
}
