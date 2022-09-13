import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeNewComponent } from './employee-new/employee-new.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '',component: EmployeeComponent,
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'new', component: EmployeeNewComponent },
      { path: ':id', component: EmployeeProfileComponent },
      { path: ':id/edit', component: EmployeeEditComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
