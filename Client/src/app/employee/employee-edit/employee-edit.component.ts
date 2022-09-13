import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'src/app/lib/subsink';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Employee } from 'src/app/lib/interfaces/Employee';
import { EmployeeService } from '../employee.service';
import { DepartmentService } from 'src/app/department/department.service';
import { Department } from 'src/app/lib/interfaces/Department';

interface EmployeeEditInterface {
  formSubmitting: boolean;
  error: boolean;
  loading: boolean;
}

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  checkIcon = faCheck;
  loadingIcon = faSpinner;
  twitter = faTwitter;

  subs = new SubSink();

  EmployeeFormGroup = this.fb.group({
    FirstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    LastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    Email: ['', [Validators.email,Validators.required]],
    DepartmentId: [0, [Validators.required]],
    HireDate: [new Date(), [Validators.required]],
    Cellphone: [''],
    Salary: [0,[Validators.required]],
    Balance: [0, [Validators.required]],
    Address: ['', [Validators.required]],
    Status: [false, [Validators.required]]
  });

  state$ = new BehaviorSubject<EmployeeEditInterface>({
    formSubmitting: false,
    error: false,
    loading: false,
  });
  Employees$ = new BehaviorSubject<Partial<Employee>[] | undefined>(undefined);
  Employee$ = new BehaviorSubject<Partial<Employee> | undefined>(undefined);
  departments$ = new BehaviorSubject<Partial<Department>[] | undefined>(
    undefined
  );

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private EmployeeService: EmployeeService,
    private router: Router,
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.state$.next({ ...this.state$.value, loading: true });

    this.subs.sink = this.route.paramMap
      .pipe(
        map((params) => {
          const id = params.get('id');

          return id ? id : undefined;
        }),
        switchMap((id) => {
          if (!id) throw new Error('invalid blog post Employee Id');
          return this.EmployeeService.getEmployeeById(parseInt(id));
        })
      )
      .subscribe(this.Employee$);

    this.subs.sink = this.state$.subscribe((state) => {
      if (state.formSubmitting) {
        this.EmployeeFormGroup.disable();
      } else {
        this.EmployeeFormGroup.enable();
      }
    });
    this.subs.sink = this.Employee$.subscribe({
      next: (employee) => {
        if (employee) {
          this.EmployeeFormGroup.patchValue({
            FirstName: employee.FirstName,
            LastName: employee.LastName,
            Email: employee.Email,
            DepartmentId: employee.DepartmentId,
            HireDate: employee.HireDate,
            Cellphone: employee.CellPhone,
            Salary: employee.Salary,
            Balance: employee.Balance,
            Address: employee.Address,
            Status: employee.Status,
          });
        }
        this.state$.next({
          ...this.state$.value,
          error: false,
          loading: false,
        });
      },
      error: () => {
        this.state$.next({ ...this.state$.value, error: true, loading: false });
      },
    });
    this.subs.sink = this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departments$.next(departments);
      },
      error: () => {
        this.snackBar.open(
          'Unable to get departments, please try again later.',
          'Dismiss',
          {
            duration: -1,
          }
        );
      },
    });
  }

  updateEmployeeHandler(e: any) {
    if (this.EmployeeFormGroup.invalid) return;
    console.log(this.EmployeeFormGroup.get('FirstName'));
    this.state$.next({ ...this.state$.value, formSubmitting: true });
    const employeeForm: Partial<Employee> = {
      FirstName: this.EmployeeFormGroup.get('FirstName')?.value || undefined,
      LastName: this.EmployeeFormGroup.get('LastName')?.value || undefined,
      Email: this.EmployeeFormGroup.get('Email')?.value || undefined,
      DepartmentId:this.EmployeeFormGroup.get('DepartmentId')?.value || undefined,
      HireDate: this.EmployeeFormGroup.get('HireDate')?.value || undefined,
      CellPhone: this.EmployeeFormGroup.get('Cellphone')?.value || undefined,
      Position: 1,
      Salary: this.EmployeeFormGroup.get('Salary')?.value || undefined,
      Balance: this.EmployeeFormGroup.get('Balance')?.value || undefined,
      Address: this.EmployeeFormGroup.get('Address')?.value || undefined,
      Status: this.EmployeeFormGroup.get('Status')?.value || undefined,
      EmployeeId: this.Employee$.value?.EmployeeId || undefined,
      CreatedBy: 1,
    };

    this.subs.sink = this.EmployeeService.updateEmployee(employeeForm).subscribe({
      next: (Employee: any) => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.EmployeeFormGroup.reset();
        this.router.navigate(['employee/']);
      },
      error: () => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.snackBar.open(
          'Unable to Update Employee, please try again later.',
          'Dismiss',
          {
            duration: -1,
          }
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
