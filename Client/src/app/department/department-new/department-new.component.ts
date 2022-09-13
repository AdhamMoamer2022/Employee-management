import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'src/app/lib/subsink';
import { BehaviorSubject } from 'rxjs';
import { DepartmentService } from '../department.service';
import { Department } from 'src/app/lib/interfaces/Department';

interface DepartmentNewInterface {
  formSubmitting: boolean;
  error: boolean;
}

@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['./department-new.component.css']
})
export class DepartmentNewComponent implements OnInit {
  checkIcon = faCheck;
  loadingIcon = faSpinner;
  twitter = faTwitter;

  subs = new SubSink();

  DepartmentFormGroup = this.fb.group({
    DepartmentName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    DepartmentEmail: ['', [Validators.email,Validators.required]],
    DepartmentDescription: [''],
    DepartmentPhone: [null,[Validators.required]],
    DepartmentAddress: ['', [Validators.required]],
    Status: [false, [Validators.required]]
  });

  state$ = new BehaviorSubject<DepartmentNewInterface>({
    formSubmitting: false,
    error: false,
  });
  Departments$ = new BehaviorSubject<Partial<Department>[] | undefined>(undefined);
  Department$ = new BehaviorSubject<Partial<Department> | undefined>(undefined);


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private DepartmentService: DepartmentService,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    //get the list of departments
    this.subs.sink = this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.Departments$.next(departments);
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

  createDepartmentHandler(e: any) {
    if (this.DepartmentFormGroup.invalid) return;

    this.state$.next({ ...this.state$.value, formSubmitting: true });
    const DepartmentForm: Partial<Department> = {
      DepartmentName: this.DepartmentFormGroup.get('DepartmentName')?.value || '',
      DepartmentEmail: this.DepartmentFormGroup.get('DepartmentEmail')?.value || '',
      DepartmentDescription: this.DepartmentFormGroup.get('DepartmentDescription')?.value || '',
      DepartmentPhone: this.DepartmentFormGroup.get('DepartmentPhone')?.value   || '',
      DepartmentAddress: this.DepartmentFormGroup.get('DepartmentAddress')?.value || '',
      Status: this.DepartmentFormGroup.get('Status')?.value || false,
      CreatedBy: 1,
    };

    this.subs.sink = this.DepartmentService.addDepartment(DepartmentForm).subscribe({
      next: (Department: any) => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.DepartmentFormGroup.reset();
        this.router.navigate(['Department/', Department.DepartmentId]);
      },
      error: () => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.snackBar.open(
          'Unable to create Department, please try again later.',
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
