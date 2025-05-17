import { Routes} from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const routes: Routes = [
    {path: '', component: CourseListComponent},
    {path: 'schema', component: ScheduleComponent}
];
