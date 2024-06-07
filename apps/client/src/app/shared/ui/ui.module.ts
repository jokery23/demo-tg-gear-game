import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { GearCurrencyIconComponent } from './components/icons/gear-currency-icon/gear-currency-icon.component';

@NgModule({
  declarations: [ButtonComponent, GearCurrencyIconComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, GearCurrencyIconComponent],
})
export class UiModule {}
