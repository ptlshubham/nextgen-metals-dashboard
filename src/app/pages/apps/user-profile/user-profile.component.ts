import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * User Profile Component
 */
export class UserProfileComponent implements OnInit {
  role: any;
  validationForm!: FormGroup;
  isPwdOpen: boolean = false;

  submitted = false;
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor(
    public formBuilder: FormBuilder
  ) { 
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Contacts' },
      { label: 'Profile', active: true }
    ];
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
