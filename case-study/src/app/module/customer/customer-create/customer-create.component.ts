import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../mode/customer/customer';
import {CustomerType} from '../../../mode/customer/customer-type';
import {CustomerService} from '../../../service/customer.service';
import {Subscription} from 'rxjs';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

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
  errorMessages = {
    name: [
      {type: 'required', message: 'name is required.'},
      {type: 'pattern', message: 'Please enter a valid name!'}
    ],
    email: [
      {type: 'required', message: 'email is required.'},
      {type: 'email', message: 'Please enter a valid e-mail address!'}
    ],
    phone: [
      {type: 'required', message: 'phone is required.'},
      {type: 'pattern', message: 'phoneNumber wrong format 090xxxxxxx  091xxxxxxx (84)+90xxxxxxx (84)+91xxxxxxx'}
    ],
    idCard: [
      {type: 'required', message: 'idCard is required.'},
      {type: 'pattern', message: 'XXXXXXXXX or XXXXXXXXXXXX (X 0-9)'}
    ],
  };


  constructor(private customerService: CustomerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.subscription = this.customerService.getCusType().subscribe(
      data => {
        this.cusTypes = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.pattern('[A-Z][a-z]*([ ][A-Z][a-z]*)*')]],
        dateOfBirth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        idCard: ['', [Validators.required, Validators.pattern('^\\d{9}$|^\\d{12}$')]],
        phone: ['', [Validators.required, Validators.pattern('^090\\d{7}$|^091\\d{7}$|^[(]84[)][+]90\\d{7}$|^[(]84[)][+]91\\d{7}$')]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        cusType: ['', [Validators.required]],
      }, {validators: this.checkDOB.bind(this)}
    );
  }

  name() {
    return this.form.get('name');
  }

  idCard() {
    return this.form.get('idCard');
  }

  phone() {
    return this.form.get('phone');
  }

  email() {
    return this.form.get('email');
  }

  address() {
    return this.form.get('address');
  }

  checkDOB(formGroup: FormGroup) {
    const {value: dateOfBirth} = formGroup.get('dateOfBirth');
    const dOB = new Date(dateOfBirth);
    const dateNow = Date.now();
    // @ts-ignore
    const timeDiff = Math.abs(dateNow - dOB);
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    return age >= 18 ? null : {ageMustBe18: true};
  }

  onSubmit() {
    console.log(123);
    console.log(this.form);
    console.log(this.form.valid);
    console.log(this.form.errors);
    console.log(123);
  }
}
