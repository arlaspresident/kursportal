import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, CourseListComponent, ScheduleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kursportal';
}
