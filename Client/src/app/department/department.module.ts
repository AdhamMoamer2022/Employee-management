import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentService } from '../department/department.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { VacationService } from '../lib/services/vacation.service';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DepartmentNewComponent } from './department-new/department-new.component';
import { DepartmentProfileComponent } from './department-profile/department-profile.component';
import { EmployeeService } from '../employee/employee.service';

@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentListComponent,
    DepartmentEditComponent,
    DepartmentNewComponent,
    DepartmentProfileComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    //Material
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [EmployeeService, DepartmentService, MatDatepickerModule,MatNativeDateModule,VacationService],
})
export class DepartmentModule {}
