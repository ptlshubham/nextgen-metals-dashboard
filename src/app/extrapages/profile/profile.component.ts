import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  role: any;
  validationForm!: FormGroup;
  isPwdOpen: boolean = false;

  submitted = false;
  constructor(
    public formBuilder: FormBuilder
  ) {
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      fname: ['Shubham', [Validators.required]],
      lname: ['Patel', [Validators.required]],
      contact: ['8141952604', [Validators.required, Validators.min(1)]],
      email: ['info@nextgenmetals.com', [Validators.required, Validators.email]],
      companyname: ['Nextgen Metals', [Validators.required]],
      desgination: ['Manager', [Validators.required]],
      gstno: ['39294SS42MSB', [Validators.required]],
      workphone: ['701644159', [Validators.required, Validators.min(1)]],
      address: ['32a, Knowledge Park 1, Greater Noida, Noida Delhi, India, 201301', [Validators.required]],

      currentpwd: ['', Validators.required],
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]

    }, {
      validator: MustMatch('password', 'confirmpwd'),

    });
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validationForm.invalid) {
      return;
    }
  }
  openPasswordEdit() {
    this.isPwdOpen = true;
  }
  closePasswordEdit() {
    this.isPwdOpen = false;
  }
}

