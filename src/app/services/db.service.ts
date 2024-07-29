import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, map, Observable, of } from 'rxjs';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { tbl_Jobs, tbl_Jobs_Applied } from '../Models/tblJobs.model';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private apiUrl = 'http://localhost:3000';
  isSidebarOpen: boolean = true
  isHomeRoute = false;
  messageService = inject(MessageService)

  isUserLoggedIn: boolean = false;
  loggedInUserId!: number;
  loggedInUserRole!: string;
  loggedInUserEmail!: string;
  users: User[] = []
  allJobs: tbl_Jobs[] = []
  constructor(private router: Router, private http: HttpClient) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHomeRoute = event.url === '/home' || event.url === '/';
      });

    this.getUsers();

  }

  //Toast messages
  showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  showInfo(msg: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: msg });
  }

  showWarn(msg: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: msg });
  }

  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
  //get users data
  getUsers(): void {

    this.http.get<User[]>(`${this.apiUrl}/users`).subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        this.showError('Error while fetching users data')
        console.error('Error fetching users', error);
      }
    );
  }
  //register and login logics
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  login(empId: number, password: string): Observable<any> {
    this.getUsers(); //getting latest user data
    console.log('users', this.users);

    const user = this.users.find(u => u.empId === empId && u.password === password);
    if (user) {
      return of({ message: 'Login successful', user }).pipe(delay(1000));
    } else {
      return of({ message: 'Invalid employeeId or password' }).pipe(delay(1000));
    }
  }

  getUserData() {
    const userData: User = JSON.parse(sessionStorage.getItem('user')!)
    this.loggedInUserId = userData.empId;
    this.loggedInUserRole = userData.role
    this.loggedInUserEmail = userData.email
    console.log(userData);
    return userData;
  }

  postJob(postJob: tbl_Jobs): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, postJob);

  }
  getAllJobs(): Observable<tbl_Jobs[]> {
    return this.http.get<tbl_Jobs[]>(`${this.apiUrl}/jobs`)
  }

  getMyAppliedJobs(empEmail: string): Observable<tbl_Jobs_Applied[]> {
    return this.http.get<tbl_Jobs_Applied[]>(`${this.apiUrl}/appliedJobs`).pipe(
      map((jobs:tbl_Jobs_Applied[]) => jobs.filter(job => job.empEmail === empEmail))
    );
  }

  applyJob(applyJob: tbl_Jobs_Applied): Observable<any> {
    return this.http.post(`${this.apiUrl}/appliedJobs`, applyJob);

  }
}
