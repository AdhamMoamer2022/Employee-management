import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../lib/interfaces/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(environment.DepartmentApiUrl);
  }

  getDepartmentById(id: number) {
    return this.http.get(environment.DepartmentApiUrl + '/' + id);
  }

  addDepartment(department: Partial<Department>) {
    return this.http.post(environment.DepartmentApiUrl, department);
  }

  updateDepartment(department: Partial<Department>) {
    return this.http.put(environment.DepartmentApiUrl, department);
  }

  deleteDepartment(id: number) {
    return this.http.delete(environment.DepartmentApiUrl + '/' + id);
  }
  }
