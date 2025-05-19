import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../services/course.service';
import { ScheduleService } from '../../services/schedule.service';

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

  constructor(private courseService: CourseService, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      console.log('Kurser laddade:', data);
      this.courses = data;
    }, error => {
      console.error('Fel vid inläsning:', error);
    });
  }

get filteredCourses(): Course[] {
  let filtered = this.courses.filter(course =>
    course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase())
  );

  if (this.selectedSubject) {
    filtered = filtered.filter(course => course.subject === this.selectedSubject);
  }
  return filtered.sort((a, b) => {
    const valA = a[this.sortColumn];
    const valB = b[this.sortColumn];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return this.sortAsc
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return this.sortAsc ? valA -  valB : valB - valA;
    }

    return 0;
  });
}
sortColumn: keyof Course = 'courseCode'; 
sortAsc: boolean = true; 

setSort(column: keyof Course) {
  if (this.sortColumn === column) {
    this.sortAsc = !this.sortAsc; 
  } else {
    this.sortColumn = column;
    this.sortAsc = true; 
  }
}
addToSchedule(course: Course): void {
  console.log('lägger till kurs:', course);
  this.scheduleService.addCourse(course);
}

isInSchedule(course: Course): boolean {
  const current = this.scheduleService.getSchedule();
  return current.some(c=> c.courseCode === course.courseCode);
}

selectedSubject: string='';

get subjects(): string[] {
  const uniqueSubjects = new Set(this.courses.map(c => c.subject));
  return Array.from(uniqueSubjects).sort();
}

}