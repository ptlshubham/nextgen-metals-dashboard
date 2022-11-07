import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { UserListService } from 'src/app/pages/apps/user-list/user-list.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;
  role: any = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private userService:UserProfileService,
    private apiservice:ApiService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  public onChangeRole(val: any) {
    this.role = val.value;
  }
  onSubmit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
        this.userService.userLogin(this.f.email.value, this.f.password.value, this.role).subscribe((res:any)=>{
          
          if(res.length >0){
            localStorage.setItem('Role', res[0].role);
            localStorage.setItem('UserName', res[0].firstName + res[0].lastName);
            localStorage.setItem('Email', res[0].email);
            localStorage.setItem('UserId', res[0].id);
            localStorage.setItem('isProfile',res[0].profileUpdation);
            localStorage.setItem('material_quality',res[0].material_quality);
            localStorage.setItem('token',res[0].token);
            if(res[0].profileUpdation){
              this.apiservice.show('Login Successfully', { classname: 'bg-success text-center text-white', delay: 10000 });
              this.router.navigate(['landing/user-home']);
            }else{
              this.router.navigate(['landing/complete-profile'],{
                queryParams:{
                  data:res[0].id
                }
              });
            }
            
            
          }else if(res ==1){
            this.apiservice.show('Incorrect Email !....please check your Email', { classname: 'bg-danger text-center text-white', delay: 10000 });
          }else{
            this.apiservice.show('Incorrect Password !....please check your Password', { classname: 'bg-danger text-center text-white', delay: 10000 });
          }
        })
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


}
