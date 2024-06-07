import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gear-currency-icon',
  templateUrl: 'gear-currency-icon.component.html',
  styles: `
    svg {
      height: 100%;
      width: 100%;
      fill: var(--secondary-color);
    }

    svg g {
      fill: var(--secondary-color);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearCurrencyIconComponent {}
