import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user = {
    name: 'Ananya Grover',
    designation: 'UI/UX Designer',
    location: 'Ahmedabad, Gujarat',
    experience: 6,
    phone: '+91 95123 56579',
    email: 'ananya.sharma@gmail.com',
    skills: ['User Interface Design', 'UX', 'UI', 'Adobe XD', 'Mobile App', 'User Research', 'Wireframing', 'Information Architecture'],
    certifications: [
      { provider: 'Microsoft', title: 'DP-900' },
      { provider: 'Microsoft', title: 'AZ-900' },
    ]
  };

  userForm: FormGroup;

  constructor(private fb: FormBuilder,private _dialog:MatDialog) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      title: [''],
      location: [''],
      age: [''],
      experience: [''],
      ctc: [''],
      phone: [''],
      email: ['', Validators.required],
      skills: this.fb.array([]),
      certifications: this.fb.array([])
    });

  }
  ngOnInit(): void { }

  downloadResume() {
    // Logic to download resume
  }

  sendEmail() {
    // Logic to send email
  }
  
  onSubmit() {
    console.log(this.userForm.value);
    // Submit the form data to the server or perform other actions
  }

  editProfile(){
    console.log('Edit icon clicked!!.');
    this._dialog.open(CreateUserComponent)

  }
}
