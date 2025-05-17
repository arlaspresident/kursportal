import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../services/course.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
schedule: Course[] = [];

constructor(private scheduleService: ScheduleService) {}

ngOnInit(): void {
  this.schedule = this.scheduleService.getSchedule();
}
remove (courseCode: string): void{
  this.scheduleService.removeCourse(courseCode);
  this.schedule = this.scheduleService.getSchedule();
}
getTotalPoints(): number {
  return this.schedule.reduce((sum, course) => sum + course.points, 0);
}
}
