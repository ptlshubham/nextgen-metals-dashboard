import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  validationForm!: FormGroup;

  submitted = false;

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      validity: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      quantity: [0,[Validators.required, Validators.min(1)]],
      terms: [0,[Validators.required, Validators.min(1)]],
      rate: [0,[Validators.required, Validators.min(1)]],
      password: ['', Validators.required],confirmpwd: ['', Validators.required],
      select: ['', [Validators.required]],

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

}
