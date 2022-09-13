import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'src/app/lib/subsink';
import { BehaviorSubject } from 'rxjs';
import { Employee } from 'src/app/lib/interfaces/Employee';
import { EmployeeService } from '../employee.service';
import { DepartmentService } from 'src/app/department/department.service';
import { Department } from 'src/app/lib/interfaces/Department';

interface EmployeeNewInterface {
  formSubmitting: boolean;
  error: boolean;
}

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss'],
})
export class EmployeeNewComponent implements OnInit {
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
    DepartmentId: [null, [Validators.required]],
    HireDate: [null, [Validators.required]],
    Cellphone: [''],
    Salary: [null,[Validators.required]],
    Balance: [null, [Validators.required]],
    Address: ['', [Validators.required]],
    Status: [false, [Validators.required]]
  });

  state$ = new BehaviorSubject<EmployeeNewInterface>({
    formSubmitting: false,
    error: false,
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
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    //get the list of departments
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

  createEmployeeHandler(e: any) {
    if (this.EmployeeFormGroup.invalid) return;

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
      CreatedBy: 1,
    };

    this.subs.sink = this.EmployeeService.addEmployee(employeeForm).subscribe({
      next: (Employee: any) => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.EmployeeFormGroup.reset();
        this.router.navigate(['employee/', Employee.EmployeeId]);
      },
      error: () => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.snackBar.open(
          'Unable to create Employee, please try again later.',
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
