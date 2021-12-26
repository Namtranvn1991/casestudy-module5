import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CustomerListComponent, CustomerCreateComponent],
  exports: [
    CustomerListComponent
  ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerModule { }
