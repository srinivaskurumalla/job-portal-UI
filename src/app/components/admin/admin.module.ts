import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { postJobComponent } from './post-job/post-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { FieldsetModule } from 'primeng/fieldset';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    postJobComponent,
    AllJobsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FieldsetModule,
    MatExpansionModule,
    MatButtonModule
  ],
  exports: [postJobComponent,AllJobsComponent]
})
export class AdminModule { }
