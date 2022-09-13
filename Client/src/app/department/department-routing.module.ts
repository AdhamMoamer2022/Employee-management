import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentNewComponent } from './department-new/department-new.component';
import { DepartmentProfileComponent } from './department-profile/department-profile.component';
import { DepartmentComponent } from './department.component';

const routes: Routes = [
  {
    path: '',component: DepartmentComponent,
    children: [
      { path: '', component: DepartmentListComponent },
      { path: 'new', component: DepartmentNewComponent },
      { path: ':id', component: DepartmentProfileComponent },
      { path: ':id/edit', component: DepartmentEditComponent },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
