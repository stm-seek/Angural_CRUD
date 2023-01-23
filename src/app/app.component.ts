import { EmployeeService } from './employee/employee.service';
import { Employee } from './model/employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employee: Employee[] = [];
  public editEmp: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.getEmployee();
  }

  public getEmployee(): void {
    this.empService.getEmployee().subscribe(
      (res: Employee[]) => {
        this.employee = res;
        console.log(this.employee)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    console.log(addForm.value);
    document.getElementById('close-add-employee-form')?.click();
    this.empService.addEmployee(addForm.value).subscribe(
      (res: Employee) => {
        this.getEmployee();
        addForm.reset();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
        addForm.reset();
      }
    )
  }

  public onUpdateEmployee(emp: Employee): void {
    document.getElementById('close-update-employee-form')?.click();
    this.empService.updateEmployee(emp, emp.id).subscribe(
      (res: Employee) => {
        this.getEmployee();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    )
  }

  public onDeleteEmployee(empId: number): void {
    document.getElementById('close-del-employee-form')?.click();
    this.empService.deleteEmployee(empId).subscribe(
      (res: void) => {
        this.getEmployee();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    )
  }

  public searchEmployee(key: string) {
    const results: Employee[] = [];

    for (const emp of this.employee) {
      if (
        emp.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || emp.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || emp.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || emp.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      ) {
        results.push(emp)
      }
    }

    this.employee = results;

    if (!key) {
      this.getEmployee();
    }
  }

  public onOpenModal(emp: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateEmployeeModal');
      this.editEmp = emp;
      console.log(this.editEmp);
    }

    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
      this.deleteEmployee = emp;
    }

    container?.appendChild(button);
    button.click();

  }


}
