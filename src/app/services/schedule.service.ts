import { Injectable } from '@angular/core';
import { Course } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
private storageKey = 'schedule';

  constructor() { }

  getSchedule(): Course[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  addCourse(course: Course): void {
    const current = this.getSchedule();
    const exists = current.find(c => c.courseCode === course.courseCode);
    if (!exists) {
      current.push(course);
      localStorage.setItem(this.storageKey, JSON.stringify(current));
    }
  }
  removeCourse(courseCode: string): void {
    const current = this.getSchedule();
    const updated = current.filter(c => c.courseCode !== courseCode);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  clearSchedule(): void {
    localStorage.removeItem(this.storageKey);
  }
}

