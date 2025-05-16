import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CourseListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kursportal';
}
