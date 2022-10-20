import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/models/customer.model';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  validationForm!: FormGroup;
  submitted = false;
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;

  public customerModel: Customer = new Customer;

  constructor(
    public formBuilder: FormBuilder,
    public userservice: UserProfileService,
    public router: Router,
    public apiservice: ApiService
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

      selectAcc: ['', [Validators.required]],
      acHolder: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankACNo: ['', [Validators.required, Validators.min(1)]],
      branchName: ['', [Validators.required]],
      IFSC: ['', [Validators.required]],

    });
  }

  get f() { return this.validationForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.validationForm.valid) {
      //   this.userservice.registerUser(this.validationForm.value).subscribe((res: any) => {
      //   if (res == 'sucess') {
      //     Swal.fire('Successfully!', 'Regsitration completed and wait for KYC updation.Password will mail to you shortly', 'success');
      //     this.router.navigate(['pages/home']);
      //   } else if(res == 'duplicate email') {
      //     this.apiservice.show('This email is already register, Please use another email', { classname: 'bg-danger text-center text-white', delay: 10000 });
      //   }else{
      //     this.apiservice.show('Something went wrong! try after sometime', { classname: 'bg-danger text-center text-white', delay: 10000 });
      //   }
      // })
    }
    else {
      this.apiservice.show('Please Fill Details Properly', { classname: 'bg-danger text-center text-white', delay: 10000 });
    }


  }
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        debugger

        this.userservice.uploadCancelCheckImage(formdata).subscribe((response) => {
          this.materialImage = response;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }
  getSavedCustomerProfile(){
        // this.customerModel.status = this.customer.status;
    // this.customerModel.cname = this.customer.cname;
    // this.customerModel.email = this.customer.email;
    // this.customerModel.location = this.customer.location;
    // this.customerModel.contact = this.customer.contact;
    // this.customerModel.role = this.customer.role;
    // this.customerModel.comname = this.customer.comname;
    // this.customerModel.quality = this.customer.quality;
    // this.customerModel.address = this.customer.address;
    // this.customerModel.gst = this.customer.gst;
    // this.customerModel.desigination = this.customer.desigination;
    // this.customerModel.workPhone = this.customer.workPhone;
  }
}
