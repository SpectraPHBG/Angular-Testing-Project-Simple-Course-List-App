import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses/course-list/courses-list.component';
import { CourseItemComponent } from './courses/course-item/course-item.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'courses/add',
    component: CourseFormComponent
  },
  {
    path: 'courses/edit/:id',
    component: CourseFormComponent
  },
  {
    path: '',
    component: CoursesListComponent
  }
];

@NgModule({
  declarations: [
    CoursesListComponent,
    AppComponent,
    CourseItemComponent,
    CourseFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
