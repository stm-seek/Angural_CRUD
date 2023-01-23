import { Employee } from './../model/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiEndpoint = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiEndpoint}/emp`);
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiEndpoint}/emp/${id}`);
  }

  public addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiEndpoint}/emp/add`, emp);
  }

  public updateEmployee(emp: Employee, id: number): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiEndpoint}/emp/update/${id}`, emp);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoint}/emp/delete/${id}`);
  }


}
