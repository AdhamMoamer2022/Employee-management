import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'src/app/lib/subsink';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Department } from 'src/app/lib/interfaces/Department';
import { DepartmentService } from '../department.service';

interface DepartmentProfileInterface {
  formSubmitting: boolean;
  error: boolean;
  loading: boolean;
}
@Component({
  selector: 'app-department-profile',
  templateUrl: './department-profile.component.html',
  styleUrls: ['./department-profile.component.css'],
})
export class DepartmentProfileComponent implements OnInit {
  checkIcon = faCheck;
  loadingIcon = faSpinner;
  twitter = faTwitter;

  subs = new SubSink();

  state$ = new BehaviorSubject<DepartmentProfileInterface>({
    formSubmitting: false,
    error: false,
    loading: false,
  });

  Department$ = new BehaviorSubject<Partial<Department> | undefined>(undefined);
  constructor(private departmentService: DepartmentService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap
      .pipe(
        map((params) => {
          const id = params.get('id');

          return id ? id : undefined;
        }),
        switchMap((id) => {
          if (!id) throw new Error('invalid blog post Employee Id');
          return this.departmentService.getDepartmentById(parseInt(id));
        })
      )
      .subscribe(this.Department$);
  }
}
