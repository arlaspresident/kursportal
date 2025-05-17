import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  courses: Course[] = [];

  searchTerm: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      console.log('Kurser laddade:', data);
      this.courses = data;
    }, error => {
      console.error('Fel vid inläsning:', error);
    });
  }

get filteredCourses(): Course[] {
  return this.courses.filter(course =>
    course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}