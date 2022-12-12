import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  validationForm!: FormGroup;
  stateData: any = [];
  selectedState: any;
  submitted = false;

  multiDefaultOption: any = '';

  Default = [
    { name: 'Q1' },
    { name: 'Q2' },
    { name: 'Q3' },
  ];

  constructor(
    public formBuilder: FormBuilder,
    public userservice: UserProfileService,
    public router: Router,
    public apiservice: ApiService
  ) {
    this.getStateList();
  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      select: ['', [Validators.required]],
      regAs: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],

      companyname: ['', [Validators.required]],
      desgination: ['', [Validators.required]],
      gstno: ['', [Validators.required]],
      workphone: ['', [Validators.required, Validators.min(1)]],
      avg_mnth_trade: ['0', [Validators.required, Validators.min(1)]],
      // selectMaterial: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      selectState: ['', [Validators.required]],
      landmark: [''],
      pincode: ['', [Validators.required, Validators.min(6)]],


      // selectAcc: ['', [Validators.required]],
      // acHolder: ['', [Validators.required]],
      // bankName: ['', [Validators.required]],
      // bankACNo: ['', [Validators.required, Validators.min(1)]],
      // branchName: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.validationForm.valid) {
      this.multiDefaultOption;
      this.userservice.registerUser(this.validationForm.value).subscribe((res: any) => {
        if (res == 'sucess') {
          Swal.fire('Successfully!', 'Regsitration completed and wait for KYC updation.Password will mail to you shortly', 'success');
          this.router.navigate(['pages/home']);
        } else if (res == 'duplicate email') {
          this.apiservice.showNotification('top', 'right', 'This email is already register, Please use another email.', 'danger');
        } else {
          this.apiservice.showNotification('top', 'right', 'Something went wrong! try after sometime.', 'danger');
        }
      })
    } else {
      this.apiservice.showNotification('top', 'right', 'Please Fill Details Properly.', 'danger');
    }


  }
  getStateList() {
    this.userservice.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
    })
  }
  selectStateData(e: any): void {
    this.selectedState = e.target.value;
    debugger

    // let list = this.courseType.filter((x: { course: any; }) => x.course === course)[0];
    // console.log(list.id);
  }
}
