import {
  ChangeDetectionStrategy,
  Component,
  Input, OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../shared/ui/ui.module';
import {interval} from "rxjs";

@Component({
  selector: 'app-gear-game',
  standalone: true,
  imports: [CommonModule, UiModule],
  templateUrl: './gear-game.component.html',
  styleUrl: './gear-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearGameComponent implements OnInit {
  @Input() width = '300px';
  @Input() height = '300px';

  degree = signal(0);
  level = signal(0);
  running = signal(false);
  points = signal(0);

  stepPoints = 0.000001;
  limitPoints = 30;

  ngOnInit() {
    this.start();
  }

  start() {
    interval().subscribe((seconds) => {
      if (this.running()) {
        this.addPoints();
      }
    });
  }

  getRotate() {
    return `rotate(${this.degree()}deg)`;
  }

  getDuration() {
    return `${this.limitPoints - this.level()}s`;
  }

  getPoints(): number {
    return this.points();
  }

  toggle() {
    if (this.level() >= this.limitPoints) {
      return;
    }

    if (!this.running()) {
      this.running.set(true);
    }

    this.level.set(this.level() + 1);
  }

  addPoints() {
    this.points.set(this.points() + this.level() * this.stepPoints);
  }

  levelUp() {
    if (!this.running() || this.level() >= this.limitPoints) {
      return;
    }

    this.level.set(this.level() + 1);
  }
}
