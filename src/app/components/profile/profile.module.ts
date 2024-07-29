import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatIconModule} from '@angular/material/icon';
import { CreateUserComponent } from './create-user/create-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';



@NgModule({
  declarations: [UserProfileComponent, CreateUserComponent, AppliedJobsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  
  ],
  exports:[UserProfileComponent,CreateUserComponent,AppliedJobsComponent]
})
export class ProfileModule { }
