import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';
import Swal from 'sweetalert2';
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
    public userservice: UserProfileService,
    public router: Router,
    public apiservice:ApiService
  ) { }

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
      address: ['', [Validators.required]],
      avg_mnth_trade: ['0', [Validators.required, Validators.min(1)]],
      selectMaterial: ['', [Validators.required]],

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
    if(this.validationForm.valid){
      this.userservice.registerUser(this.validationForm.value).subscribe((res: any) => {
      if (res == 'sucess') {
        Swal.fire('Successfully!', 'Regsitration completed and wait for KYC updation.Password will mail to you shortly', 'success');
        this.router.navigate(['pages/home']);
      } else {
        this.apiservice.show('Something went wrong! try after sometime', { classname: 'bg-danger text-center text-white', delay: 10000 });
      }
    })
    }else{
      this.apiservice.show('Please Fill Details Properly', { classname: 'bg-danger text-center text-white', delay: 10000 });
    }
   
  
  }
}
