import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeVacation } from '../interfaces/Employeevacation';
import { Vacation } from '../interfaces/Vacation';

@Injectable({
  providedIn: 'root',
})
export class VacationService {
  constructor(private http: HttpClient) {}

  getVacationTypes(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(environment.vacationApiUrl);
  }

  getEmployeeVacations(id: number): any {
    return this.http.get(environment.vacationApiUrl + '?Employeeid=' + id);
  }

  addEmployeeVacation(vacation: Partial<EmployeeVacation>) {
    return this.http.post(environment.vacationApiUrl, vacation);
  }
}
