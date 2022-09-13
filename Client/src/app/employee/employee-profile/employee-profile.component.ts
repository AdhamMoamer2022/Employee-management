import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { VacationService } from 'src/app/lib/services/vacation.service';
import { EmployeeVacation } from 'src/app/lib/interfaces/Employeevacation';
import { Vacation } from 'src/app/lib/interfaces/Vacation';

interface EmployeeProfileInterface {
  formSubmitting: boolean;
  error: boolean;
  loading: boolean;
}

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  checkIcon = faCheck;
  loadingIcon = faSpinner;
  twitter = faTwitter;

  subs = new SubSink();

  state$ = new BehaviorSubject<EmployeeProfileInterface>({
    formSubmitting: false,
    error: false,
    loading: false,
  });

  Employee$ = new BehaviorSubject<Partial<Employee> | undefined>(undefined);
  EmployeeVacations$ = new BehaviorSubject<
    Partial<EmployeeVacation>[] | undefined
  >(undefined);

  VacationTypes$ = new BehaviorSubject<Partial<Vacation>[] | undefined>(
    undefined
  );

  ExpectedSalary$ = new BehaviorSubject<number>(0);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private EmployeeService: EmployeeService,
    private route: ActivatedRoute,
    private vacationService: VacationService,
    private cd: ChangeDetectorRef
  ) {}

  VacationFormGroup = this.fb.group({
    VacationTypeId: [null, [Validators.required]],
    StartDate: [new Date(), [Validators.required]],
    EndDate: [new Date(), [Validators.required]],
  });

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

    this.Employee$.subscribe((Employee) => {
      if (!Employee?.EmployeeId) return;
      this.vacationService
        .getEmployeeVacations(Employee.EmployeeId)
        .subscribe((EmployeeVacations: any) => {
          console.log(EmployeeVacations);
          this.EmployeeVacations$.next(EmployeeVacations);
          this.state$.next({ ...this.state$.value, loading: false });
        });
    });

    this.Employee$.subscribe((Employee) => {
      if (!Employee?.EmployeeId) return;

      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();
      
      this.EmployeeService.calculateSalary(
        Employee.EmployeeId,
        thisMonth+1,
        thisYear
      ).subscribe((salary: any) => {
        this.ExpectedSalary$.next(salary);
      });
      this.vacationService.getVacationTypes().subscribe((Vacations) => {
        this.VacationTypes$.next(Vacations);
      });
    });
  }

  AddEmployeeVacation() {
    this.state$.next({
      ...this.state$.value,
      formSubmitting: true,
      loading: true,
    });

    this.subs.sink = this.Employee$.subscribe((Employee) => {
      if (!Employee?.EmployeeId) return;

      const EmployeeVacations: Partial<EmployeeVacation> = {
        EmployeeId: Employee.EmployeeId,
        StartDate: this.VacationFormGroup.value.StartDate || new Date(),
        EndDate: this.VacationFormGroup.value.EndDate || new Date(),
        VacationTypeId: this.VacationFormGroup.value.VacationTypeId || 0,
        CreatedBy: Employee.EmployeeId,
        ApprovedBy: 1,
        ApprovedDate: new Date(),
      };

      this.vacationService
        .addEmployeeVacation(EmployeeVacations)
        .subscribe(() => {
          this.state$.next({
            ...this.state$.value,
            formSubmitting: false,
            loading: false,
          });
          this.snackBar.open('Vacation Added Successfully', 'OK', {
            duration: 2000,
          });
          this.cd.detectChanges();
        });
    });
  }
}
