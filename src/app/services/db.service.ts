import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, delay, filter, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { tbl_employee_profile, tbl_Jobs, tbl_Jobs_Applied } from '../Models/tblJobs.model';
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
  updateJob(brId: string, postJob: tbl_Jobs): Observable<any> {
    return this.http.put(`${this.apiUrl}/jobs/${brId}`, postJob);
  }
  getAllJobs(): Observable<tbl_Jobs[]> {
    return this.http.get<tbl_Jobs[]>(`${this.apiUrl}/jobs`)
  }

  getMyPostedJobs(adminEmail: string): Observable<tbl_Jobs[]> {
    return this.http.get<tbl_Jobs[]>(`${this.apiUrl}/jobs`).pipe(
      map((jobs: tbl_Jobs[]) => jobs.filter(job => job.spoc === adminEmail))
    );
  }
  getMyAppliedJobs(empEmail: string): Observable<tbl_Jobs_Applied[]> {
    return this.http.get<tbl_Jobs_Applied[]>(`${this.apiUrl}/appliedJobs`).pipe(
      map((jobs: tbl_Jobs_Applied[]) => jobs.filter(job => job.empEmail === empEmail))
    );
  }

  applyJob(applyJob: tbl_Jobs_Applied): Observable<any> {
    return this.http.post(`${this.apiUrl}/appliedJobs`, applyJob);

  }

  viewApplicants(brId: string, spoc: string) {
    return this.http.get<tbl_Jobs_Applied[]>(`${this.apiUrl}/appliedJobs`).pipe(
      map((jobs: tbl_Jobs_Applied[]) => jobs.filter(job => job.brId === brId && job.poc === spoc))
    );
  }

  getUserProfile(empId: number): Observable<any> {
    debugger
    return this.http.get<tbl_employee_profile[]>(`${this.apiUrl}/userProfiles`).pipe(
      map((profiles: tbl_employee_profile[]) => {
        const profile = profiles.find(profile => profile.empId === empId);
        if (profile) {
          return profile;
        } else {
          return { message: 'Profile not found', empId };
        }
      }),
      catchError(error => of({ message: 'Profile not found', empId }))
    );
  }

  insertUserProfile(profile: tbl_employee_profile): Observable<any> {
    console.log('Inserting profile:', profile);
    return this.http.post(`${this.apiUrl}/userProfiles`, profile).pipe(
      catchError(error => {
        console.error('Error inserting profile', error);
        return of({ message: 'Error inserting profile', error });
      })
    );
  }
  updateUserProfile(profile: tbl_employee_profile): Observable<any> {
    return this.http.put(`${this.apiUrl}/userProfiles/${profile.empId}`, profile).pipe(
      catchError(error => of({ message: 'Error updating profile', error }))
    );
  }


  saveUserProfile(profile: tbl_employee_profile): Observable<any> {
    return this.getUserProfile(profile.empId).pipe(
      switchMap(existingProfile => {
        if (existingProfile.message && existingProfile.message === 'Profile not found') {
          // Profile not found, insert new profile
          return this.insertUserProfile(profile);
        } else {
          // Profile found, update existing profile
          return this.updateUserProfile(profile);
        }
      }),
      catchError(error => of({ message: 'Error saving profile', error }))
    );
  }
  
}
