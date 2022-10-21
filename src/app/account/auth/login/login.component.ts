import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { NotificationsComponent } from 'src/app/pages/extended/notifications/notifications.component';
import { ToastService } from 'src/app/pages/extended/notifications/toast-service';

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
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  // Carousel navigation arrow show
  showNavigationArrows: any;
  fieldTextType!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserProfileService,
    private router:Router,
    private apiservice:ToastService
    ) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }else{
      this.userService.adminLogin(this.f.email.value, this.f.password.value).subscribe((res:any)=>{
        
        if(res.length >0){
          localStorage.setItem('Role', res[0].role);
          localStorage.setItem('UserName', res[0].firstName + res[0].lastName);
          localStorage.setItem('Email', res[0].email);
          localStorage.setItem('UserId', res[0].id);
          this.router.navigate(['/']);
          this.apiservice.show('Admin Login Successfully', { classname: 'bg-success text-center text-white', delay: 10000 });
        }else if(res ==1){
          this.apiservice.show('Incorrect Email !....please check your Email', { classname: 'bg-danger text-center text-white', delay: 10000 });
        }else{
          this.apiservice.show('Incorrect Password !....please check your Password', { classname: 'bg-danger text-center text-white', delay: 10000 });
        }
    });
    }
  }

  /**
   * Testimonial slider
   */
  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
