import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { tbl_Jobs } from 'src/app/Models/tblJobs.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class postJobComponent implements OnInit {

  jobForm: FormGroup;
  constructor(private fb: FormBuilder, private dbService: DbService) {
    this.jobForm = this.fb.group({
      brId: [''],
      designation: ['', Validators.required],
      skills: ['', Validators.required],
      experience: ['', Validators.required],
      location: [''],
      status: [''],
      spoc: [''],
      description: [''],
    });

  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.jobForm.value);
    if (this.jobForm.valid) {
      this.jobForm.patchValue({
        "spoc": this.dbService.loggedInUserEmail
      })
      const job: tbl_Jobs = this.jobForm.value;
      this.dbService.postJob(job).subscribe(
        () => {
          this.dbService.showSuccess('Job posted successfully!!')

        },
        (error) => {
          this.dbService.showError('Job post failed!');
          console.error('job post error', error);

        }
      )

    }
  }


  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }






}

