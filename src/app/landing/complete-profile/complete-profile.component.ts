import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  public customerModel: any;
  userId:any;
  constructor(
    public formBuilder: FormBuilder,
    public userservice: UserProfileService,
    public router: Router,
    public apiservice: ApiService,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.userId= res.data;
      this.userservice.getUserDetail(this.userId).subscribe((res:any)=>{
        this.customerModel = res[0];
        
      })
    });
    this.validationForm = this.formBuilder.group({
      select: [{value: '', disabled: true}, [Validators.required]],
      regAs: [{value: '', disabled: true}, [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],

      companyname: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      gstno: ['', [Validators.required]],
      workphone: ['', [Validators.required, Validators.min(1)]],
      address: ['' ],
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
    this.customerModel
    debugger
    this.submitted = true;
    if (this.validationForm.valid) {
        this.userservice.completeProfile(this.customerModel).subscribe((res: any) => {
        if (res == 'sucess') {
          this.router.navigate(['landing/user-home']);
        }else{
          this.apiservice.show('Something went wrong! try after sometime', { classname: 'bg-danger text-center text-white', delay: 10000 });
        }
      })
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
