import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearGameComponent } from '../../components/gear-game/gear-game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GearGameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
