import { Injectable, signal } from '@angular/core';
import {filter, interval, Subject, takeUntil} from 'rxjs';

interface LevelPoints {
  level: number;
  points: number;
}

@Injectable({
  providedIn: 'root',
})
export class GearGameService {
  level = signal(1);
  running = signal(false);
  points = signal(0);
  nextLevelPoints = signal(0);

  stepPoints = 0.0001;
  limitPoints = 3;

  levelPoints: LevelPoints[] = [
    { level: 1, points: 0.1 },
    { level: 2, points: 0.2 },
    { level: 3, points: 0.3 },
  ];

  destroy$ = new Subject<boolean>();

  constructor() {
    this.nextLevelPoints.set(this.levelPoints[0].points);
  }

  addPoints() {
    if (this.points() >= this.nextLevelPoints()) {
      this.running.set(false);
      return;
    }
    this.points.set(this.points() + this.level() * this.stepPoints);
  }

  levelUp() {
    if (this.running() || this.level() > this.limitPoints) {
      return;
    }

    this.level.set(this.level() + 1);
    this.setNextLevelPoints();
    this.running.set(true);
  }

  setNextLevelPoints() {
    this.nextLevelPoints.set(this.levelPoints.find((p) => p.level === this.level())?.points ?? this.levelPoints[0].points);
  }

  canLevelUp() {
    return this.points() >= this.nextLevelPoints() && this.level() < this.limitPoints;
  }

  start() {
    if (this.running() || this.level() >= this.limitPoints) {
      return;
    }

    this.running.set(true);
    interval()
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.running())
      )
      .subscribe((seconds) => {
        this.addPoints();
      });
  }

  destroy() {
    this.running.set(false);
    this.level.set(1);
    this.points.set(0);
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
