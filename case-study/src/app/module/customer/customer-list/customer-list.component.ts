import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from '../../../service/customer.service';
import {Customer} from '../../../mode/customer/customer';
import {CustomerType} from '../../../mode/customer/customer-type';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customer: Customer | undefined;
  customerList: Customer[] | undefined;
  cusTypeList: CustomerType[] | undefined;
  private subscription: Subscription | undefined;

  constructor(private cusService: CustomerService) { }

  ngOnInit(): void {
    this.subscription = this.cusService.getAll().subscribe(
      data => {
        console.log(data);
        this.customerList = data;
      }, error => {
        console.log(error);
      }
    );
    this.subscription = this.cusService.getCusType().subscribe(
      data => {
        this.cusTypeList = data;
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
