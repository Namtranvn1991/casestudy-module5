import { Component, OnInit } from '@angular/core';
import {Customer} from '../../../mode/customer/customer';
import {CustomerType} from '../../../mode/customer/customer-type';
import {CustomerService} from '../../../service/customer.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  form: FormGroup;
  customer: Customer;
  cusTypes: CustomerType[];
  private subscription: Subscription | undefined;

  constructor(private customerService: CustomerService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.subscription = this.customerService.getCusType().subscribe(
      data => {
        this.cusTypes = data;
      }, error => {
        console.log(error);
      }
    );
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.email]],
        dateOfBirth : ['', [Validators.required]],
        gender: ['', [Validators.required]],
        idCard: ['', [Validators.required, Validators.minLength(6)]],
        country: ['', [Validators.required]],
        age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^\\+84\\d{9,10}$')]]
      }, {validators: this.passwordCheck.bind(this)}
    );
  }

  passwordCheck(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

}
