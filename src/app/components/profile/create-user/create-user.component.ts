import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      employeeId: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      designation: [''],
      location: [''],
      experience: [''],
      status: [''],
      skills: this.fb.array([]),
      certifications: this.fb.array([])
    });

  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.userForm.value);

  }
 

  get skills() {
    return this.userForm.get('skills') as FormArray;
  }
  get certifications() {
    return this.userForm.get('certifications') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  addCertification() {
    this.certifications.push(this.fb.control(''));
  }
  // addCertification() {
  //   this.certifications.push(this.fb.group({
  //     provider: [''],
  //     title: ['']
  //   }));
  // }

  removeCertification(index: number) {
    this.certifications.removeAt(index);
  }

}
