import { Component, input } from '@angular/core';
import { AmpelLicht } from '../../models/ampel-licht';

@Component({
  selector: 'app-ampel-control',
  standalone: true,
  templateUrl: './ampel-control.component.html',
  styleUrl: './ampel-control.component.css',
})
export class AmpelControlComponent {
  aktuellesAmpelLicht = input<AmpelLicht>(AmpelLicht.None);
}

