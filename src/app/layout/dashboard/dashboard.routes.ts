import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadComponent: () => import('../../components/home/home.component').then(c => c.HomeComponent )
      },
      {
        path: 'staffs',
        loadComponent: () => import('../../components/staffs/staffs.component').then(c => c.StaffsComponent )
      },
      {
        path: 'cows',
        loadComponent: () => import('../../components/cows/cows.component').then(c => c.CowsComponent )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
