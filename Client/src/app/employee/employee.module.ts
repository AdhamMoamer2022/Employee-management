import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeNewComponent } from './employee-new/employee-new.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from './employee.service';
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
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { VacationService } from '../lib/services/vacation.service';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeNewComponent,
    EmployeeEditComponent,
    EmployeeProfileComponent,
    EmployeeListComponent,


  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
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
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ConfirmBoxComponent],
  providers: [EmployeeService, DepartmentService, MatDatepickerModule,MatNativeDateModule,VacationService],
})
export class EmployeeModule {}
