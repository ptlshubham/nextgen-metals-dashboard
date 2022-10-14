import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/core/services/user.service';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  validationForm!: FormGroup;

  submitted = false;
  constructor(
    public formBuilder: FormBuilder,
    public userservice:UserProfileService
  ) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      select: ['', [Validators.required]],
      selectR:['', [Validators.required]],
      selectM:['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      companyname: ['', [Validators.required]],
      desgination: ['', [Validators.required]],
      gstno: ['', [Validators.required]],
      workphone: ['', [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.validationForm.value;
    debugger
    // stop here if form is invalid
    if (!this.validationForm.invalid) {
      this.userservice.registerUser(this.validationForm.value)
    }
  }
}
