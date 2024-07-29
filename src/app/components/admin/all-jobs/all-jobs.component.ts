import { Component, OnInit } from '@angular/core';
import { tbl_Jobs, tbl_Jobs_Applied } from 'src/app/Models/tblJobs.model';
import { DbService } from 'src/app/services/db.service';
interface ExtendedJob extends tbl_Jobs {
  panelOpenState: boolean;
}
@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {
  panelOpenState = false;
  allJobs: ExtendedJob[] = []
  myAppliedJobs: tbl_Jobs_Applied[] = []
  constructor(public dbService: DbService) { }

  ngOnInit(): void {
    if (this.dbService.loggedInUserRole === 'admin_hr')
      this.loadAllJobs();
    if (this.dbService.loggedInUserRole === 'employee') {
      this.loadMyAppliedJobs();
      this.loadAllJobs();
    }
  }

  loadMyAppliedJobs(): void {
    this.dbService.getMyAppliedJobs(this.dbService.loggedInUserEmail).subscribe(
      (data: tbl_Jobs_Applied[]) => {
        // Initialize panelOpenState for each job
        this.myAppliedJobs = data.map(job => ({ ...job, panelOpenState: false }));
        console.log('my applied jobs with panel state', this.myAppliedJobs);


      },
      (error) => {
        this.dbService.showError('Error while fetching applied jobs data');
        console.error('Error fetching applied  jobs', error);
      }
    );
  }
  loadAllJobs(): void {
    this.dbService.getAllJobs().subscribe(
      (data: tbl_Jobs[]) => {
        // Initialize panelOpenState for each job
        this.allJobs = data.map(job => ({ ...job, panelOpenState: false, isApplied: false }));
        console.log('all jobs with panel state', this.allJobs);


      },
      (error) => {
        this.dbService.showError('Error while fetching jobs data');
        console.error('Error fetching all jobs', error);
      }
    );
  }

  togglePanel(job: ExtendedJob): void {
    job.panelOpenState = !job.panelOpenState;
  }

  applyJob(job: tbl_Jobs) {
    console.log('apply job', job);
    let applyJob: tbl_Jobs_Applied = {
      applicationId: 'AP1001' + this.dbService.loggedInUserId, //auto generate in sql
      brId: job.brId,
      empEmail: this.dbService.loggedInUserEmail,
      status: 'Applied',
      poc: job.spoc,
      appliedDate: new Date()
    }
    this.dbService.applyJob(applyJob).subscribe(
      (res) => {
        console.log(res.value);
         // Update the job to reflect that it has been applied
         job.isApplied = true;
        this.dbService.showSuccess('Applied Successfully')
      },
      (error) => {
        console.log('error while applying', error);
        this.dbService.showError('Error while applying job')

      }
    )

  }
}
