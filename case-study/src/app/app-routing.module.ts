import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './module/home/home.component';


const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import ('./module/customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
