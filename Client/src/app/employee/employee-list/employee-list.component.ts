import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'src/app/lib/subsink';
import { BehaviorSubject } from 'rxjs';
import { Employee } from 'src/app/lib/interfaces/Employee';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeService } from '../employee.service';
import {
  ConfirmBoxComponent,
  ConfirmDialogModel,
} from '../confirm-box/confirm-box.component';
//import { ConfirmBoxComponent } from '../../../confirm-box/confirm-box.component';

interface employeeListState {
  loading: boolean;
  error: boolean;
  deleting: boolean;
  recovering: boolean;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  subs = new SubSink();
  result: string = '';
  loadingIcon = faSpinner;
  @ViewChild('table') table?: MatTable<Partial<Employee>>;
  state$ = new BehaviorSubject<employeeListState>({
    loading: false,
    error: false,
    deleting: false,
    recovering: false,
  });

  dataSource: MatTableDataSource<Partial<Employee>> | undefined =
    new MatTableDataSource<Partial<Employee>>();
  displayedColumns: string[] = [
    'name',
    'email',
    'department',
    'status',
    'update',
    'delete',
  ];

  employee$ = new BehaviorSubject<Partial<Employee>[] | undefined>(undefined);

  ngOnInit(): void {
    this.state$.next({ ...this.state$.value, loading: true });
    this.subs.sink = this.employeeService.getEmployees().subscribe({
      next: (employees: Partial<Employee>[]) => {
        console.log(employees);
        this.state$.next({ ...this.state$.value, loading: false });
        this.employee$.next(employees);
        this.dataSource = new MatTableDataSource<Partial<Employee>>(
          this.employee$.value
        );
      },
      error: () => {
        this.state$.next({
          ...this.state$.value,
          loading: false,
          error: true,
        });
        this.snackBar.open(
          'Unable to load employees, please try again later',
          'Dismiss',
          {
            duration: -1,
          }
        );
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource)
      this.dataSource.filterPredicate = function (
        data,
        filter: string
      ): boolean {
        if (data.FirstName) {
          return data.FirstName.toLowerCase().includes(filter);
        } else if (data.LastName) {
          return data.LastName.toLowerCase().includes(filter);
        } else if (data.Email) {
          return data.Email.toLowerCase().includes(filter);
        } else if (data.Email) {
          return data.Email.toLowerCase().includes(filter);
        } else return false;
      };
  }

  deleteEmployee(employeeId: number) {
    if (!employeeId) throw new Error('Invalid Employee id on delete');
    this.state$.next({ ...this.state$.value, deleting: true });
    this.subs.sink = this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.state$.next({ ...this.state$.value, deleting: false });
        this.snackBar.open('Employee Deleted', 'Dismiss', {
          duration: 3000,
        });
        this.employee$.next(
          this.employee$.value?.filter((e) => e.EmployeeId !== employeeId)
        );
        this.dataSource = new MatTableDataSource<Partial<Employee>>(
          this.employee$.value
        );
      },
      error: () => {
        this.state$.next({ ...this.state$.value, deleting: false });
        this.snackBar.open(
          'Unable to delete employee please try again later',
          'Dismiss',
          {
            duration: -1,
          }
        );
      },
    });
  }

  filterHandler(event: any) {
    let filterValue = event?.target.value.toString();
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (this.dataSource) this.dataSource.filter = filterValue;
  }

  confirmDialog(employee: Partial<Employee>): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (employee.EmployeeId) this.deleteEmployee(employee.EmployeeId);
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
