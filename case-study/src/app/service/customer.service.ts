import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../mode/customer/customer';
import {CustomerType} from '../mode/customer/customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlCustomer = 'http://localhost:3000/customer';
  private urlCusType = 'http://localhost:3000/customerType';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Customer[]>(this.urlCustomer);
  }

  getCusType(){
    return this.http.get<CustomerType[]>(this.urlCusType);
  }
}
