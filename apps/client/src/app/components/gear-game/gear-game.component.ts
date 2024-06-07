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
  speed = signal(0);
  running = signal(false);
  points = signal(0);

  stepPoints = 0.001;
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
    return `${this.limitPoints - this.speed()}s`;
  }

  getPoints() {
    return `${Math.round(this.points())}$`;
  }

  toggle() {
    if (this.speed() >= this.limitPoints) {
      return;
    }

    if (!this.running()) {
      this.running.set(true);
    }

    this.speed.set(this.speed() + 1);
  }

  addPoints() {
    this.points.set(this.points() + this.speed() * this.stepPoints);
  }

  speedUp() {
    if (!this.running() || this.speed() >= this.limitPoints) {
      return;
    }

    this.speed.set(this.speed() + 1);
  }
}
