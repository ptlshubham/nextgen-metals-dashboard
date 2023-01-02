import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';

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
  stateData: any = [];
  selectedState: any;

  public customerModel: any;
  userId: any;
  
  multiDefaultOption: any='';

  Default = [
    { name: 'Q1' },
    { name: 'Q2' },
    { name: 'Q3' },
  ];
  constructor(
    public formBuilder: FormBuilder,
    public userservice: UserProfileService,
    public router: Router,
    public apiservice: ApiService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.getStateList();

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.userId = res.data;
      this.userservice.getUserDetail(this.userId).subscribe((res: any) => {
        this.customerModel = res[0];
        this.selectedState = this.customerModel.state;
        let ab = this.customerModel.MaterialQuality.split(',');
        this.multiDefaultOption = ab;
        this.imageUrl= this.customerModel.CancelCheque
        if(this.imageUrl != undefined||this.imageUrl!=null ){
          this.imageUrl='assets/images/file-upload-image.jpg';
        }
      })
    });
    this.validationForm = this.formBuilder.group({
      select: [{ value: '', disabled: true }, [Validators.required]],
      regAs: [{ value: '', disabled: true }, [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      companyname: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      gstno: ['', [Validators.required]],
      workphone: ['', [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      selectState: ['', [Validators.required]],
      landmark: [''],
      multiDefaultOption: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.min(6)]],
      avg_mnth_trade: ['0', [Validators.required, Validators.min(1)]],
      selectAcc: ['', [Validators.required]],
      acHolder: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankACNo: ['', [Validators.required, Validators.min(1)]],
      branchName: ['', [Validators.required]],
      ISFC: ['', [Validators.required]],

    });
  }

  get f() { return this.validationForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.validationForm
    debugger
    if (this.validationForm.valid) {
      this.userservice.completeProfile(this.customerModel).subscribe((res: any) => {
        debugger
        if (res == 'success') {
          this.router.navigate(['/landing/user-home']);
        } else {
          this.apiservice.showNotification('top', 'right', 'Something went wrong! try after sometime.', 'danger');
        }
      })
    }
    else {
      this.apiservice.showNotification('top', 'right', 'Please Fill Details Properly.', 'danger');
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
        this.userservice.uploadCancelCheckImage(formdata).subscribe((response) => {
          this.materialImage = response;
          this.customerModel.cancel_cheque = this.materialImage;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
    }
  }
  getStateList() {
    this.userservice.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
      this.selectedState = this.customerModel.state;
    })
  }
  selectStateData(e: any): void {
    this.selectedState = e.target.value;
    this.customerModel.state = e.target.value;
  }

}
