import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../lib/interfaces/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.EmployeeApiUrl);
  }

  getEmployeeById(id: number) {
    return this.http.get(environment.EmployeeApiUrl + '/' + id);
  }
  
  addEmployee(employee: Partial<Employee>) {

    return this.http.post(environment.EmployeeApiUrl, employee);
  }

  updateEmployee(employee: Partial<Employee>) {
    return this.http.put(environment.EmployeeApiUrl, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(environment.EmployeeApiUrl + '/' + id);
  }

  calculateSalary(id: number, month: number, year: number) {
    return this.http.get(
      environment.EmployeeApiUrl +
        '?Employeeid=' +
        id +
        '&month=' +
        month +
        '&year=' +
        year
    );
  }
}
