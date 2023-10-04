import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a class="link-primary" [routerLink]="['/dashboard/home']" >Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{activeBreadcrumb}}</li>
  </ol>
</nav>
  `,
  styles: [
  ]
})
export class BreadcrumbComponent {

  @Input('activeBreadcrumb') activeBreadcrumb = '';

}
