import {
  ChangeDetectionStrategy,
  Component,
  Input, OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../shared/ui/ui.module';
import { GearGameService } from './services/gear-game/gear-game.service';

@Component({
  selector: 'app-gear-game',
  standalone: true,
  imports: [CommonModule, UiModule],
  templateUrl: './gear-game.component.html',
  styleUrl: './gear-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearGameComponent implements OnDestroy {
  @Input() width = '300px';
  @Input() height = '300px';

  degree = signal(0);

  constructor(private gearGameService: GearGameService) {}

  ngOnDestroy() {
    this.gearGameService.destroy();
  }

  getRotate() {
    return `rotate(${this.degree()}deg)`;
  }

  getDuration() {
    return `${
      this.gearGameService.limitPoints - this.gearGameService.level()
    }s`;
  }

  getPoints(): number {
    return this.gearGameService.points();
  }

  getNextLevelPoints(): number {
    return this.gearGameService.nextLevelPoints();
  }

  canLevelUp(): boolean {
    return this.gearGameService.canLevelUp();
  }

  start() {
    this.gearGameService.start();
  }

  getRunning(): boolean {
    return this.gearGameService.running();
  }

  getLevel(): number {
    return this.gearGameService.level();
  }

  levelUp() {
    this.gearGameService.levelUp();
  }
}
