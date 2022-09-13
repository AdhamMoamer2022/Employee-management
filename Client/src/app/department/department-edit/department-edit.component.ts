import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'src/app/lib/subsink';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { DepartmentService } from '../department.service';
import { Department } from 'src/app/lib/interfaces/Department';

interface DepartmentNewInterface {
  formSubmitting: boolean;
  error: boolean;
  loading: boolean;
}
@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
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
    DepartmentPhone: ['',[Validators.required]],
    DepartmentAddress: ['', [Validators.required]],
    Status: [false, [Validators.required]]
  });

  state$ = new BehaviorSubject<DepartmentNewInterface>({
    formSubmitting: false,
    error: false,
    loading: false,
  });
  Departments$ = new BehaviorSubject<Partial<Department>[] | undefined>(undefined);
  Department$ = new BehaviorSubject<Partial<Department> | undefined>(undefined);


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private DepartmentService: DepartmentService,
    private router: Router,
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.state$.next({ ...this.state$.value, loading: true });

    this.subs.sink = this.state$.subscribe((state) => {
      if (state.formSubmitting) {
        this.DepartmentFormGroup.disable();
      } else {
        this.DepartmentFormGroup.enable();
      }
    });

    this.subs.sink = this.route.paramMap
      .pipe(
        map((params) => {
          const id = params.get('id');

          return id ? id : undefined;
        }),
        switchMap((id) => {
          if (!id) throw new Error('invalid blog post Department Id');
          return this.DepartmentService.getDepartmentById(parseInt(id));
        })
      )
      .subscribe(this.Department$);
      
    this.subs.sink = this.Department$.subscribe({
      next: (department) => {
        if (department) {
          this.DepartmentFormGroup.patchValue({
            DepartmentName: department.DepartmentName,
            DepartmentEmail: department.DepartmentEmail,
            DepartmentDescription: department.DepartmentDescription,
            DepartmentPhone: department.DepartmentPhone || '',
            DepartmentAddress: department.DepartmentAddress,
            Status: department.Status,
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
  }

  updateDepartmentHandler(e: any) {
    if (this.DepartmentFormGroup.invalid) return;

    this.state$.next({ ...this.state$.value, formSubmitting: true });
    const DepartmentForm: Partial<Department> = {
      DepartmentName: this.DepartmentFormGroup.get('DepartmentName')?.value || '',
      DepartmentEmail: this.DepartmentFormGroup.get('DepartmentEmail')?.value || '',
      DepartmentDescription: this.DepartmentFormGroup.get('DepartmentDescription')?.value || '',
      DepartmentPhone: this.DepartmentFormGroup.get('DepartmentPhone')?.value   || '',
      DepartmentAddress: this.DepartmentFormGroup.get('DepartmentAddress')?.value || '',
      Status: this.DepartmentFormGroup.get('Status')?.value || false,
      DepartmentId: this.Department$.value?.DepartmentId || 0,
      CreatedBy: 1,
    };

    this.subs.sink = this.DepartmentService.updateDepartment(DepartmentForm).subscribe({
      next: (Department: any) => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.DepartmentFormGroup.reset();
        this.router.navigate(['department/', this.Department$.value?.DepartmentId]);
      },
      error: () => {
        this.state$.next({ ...this.state$.value, formSubmitting: false });
        this.snackBar.open(
          'Unable to Update Department, please try again later.',
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
