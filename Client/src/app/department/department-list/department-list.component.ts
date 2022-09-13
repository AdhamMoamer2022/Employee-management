import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'src/app/lib/subsink';
import { BehaviorSubject } from 'rxjs';
import { Department } from 'src/app/lib/interfaces/Department';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';
import { DepartmentService } from '../department.service';



interface DepartmentListState {
  loading: boolean;
  error: boolean;
  deleting: boolean;
  recovering: boolean;
}

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  constructor(
    private DepartmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  subs = new SubSink();
  loadingIcon = faSpinner;
  @ViewChild('table') table?: MatTable<Partial<Department>>;
  state$ = new BehaviorSubject<DepartmentListState>({
    loading: false,
    error: false,
    deleting: false,
    recovering: false,
  });

  dataSource: MatTableDataSource<Partial<Department>> | undefined =
    new MatTableDataSource<Partial<Department>>();
  displayedColumns: string[] = [
    'name',
    'email',
    'status',
    'update',
    'delete',
  ];

  Department$ = new BehaviorSubject<Partial<Department>[] | undefined>(undefined);

  ngOnInit(): void {
    this.state$.next({ ...this.state$.value, loading: true });
    this.subs.sink = this.DepartmentService.getDepartments().subscribe({
      next: (Departments: Partial<Department>[]) => {
        console.log(Departments);
        this.state$.next({ ...this.state$.value, loading: false });
        this.Department$.next(Departments);
        this.dataSource = new MatTableDataSource<Partial<Department>>(
          this.Department$.value
        );
      },
      error: () => {
        this.state$.next({
          ...this.state$.value,
          loading: false,
          error: true,
        });
        this.snackBar.open(
          'Unable to load Departments, please try again later',
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
        if (data.DepartmentName) {
          return data.DepartmentName.toLowerCase().includes(filter);
        } else if (data.DepartmentEmail) {
          return data.DepartmentEmail.toLowerCase().includes(filter);
        } else return false;
      };
  }

  deleteDepartment(DepartmentId: number) {
    if (!DepartmentId) throw new Error('Invalid certified builder id on delete');
    this.state$.next({ ...this.state$.value, deleting: true });
    this.subs.sink = this.DepartmentService.deleteDepartment(DepartmentId).subscribe({
      next: () => {
        this.state$.next({ ...this.state$.value, deleting: false });
      },
      error: () => {
        this.state$.next({ ...this.state$.value, deleting: false });
        this.snackBar.open(
          'Unable to delete certified builder please try again later',
          'Dismiss',
          {
            duration: -1,
          }
        );
      },
    });
  }

  editDepartment(DepartmentId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = DepartmentId;
    const dialogRef = this.dialog.open(DepartmentEditComponent, dialogConfig);
  }
  filterHandler(event: any) {
    let filterValue = event?.target.value.toString();
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (this.dataSource) this.dataSource.filter = filterValue;
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
