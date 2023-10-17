import { AuthService } from './../../auth/services/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(
    public sidebarservice: SidebarService,
    private router: Router,
    private authService: AuthService
  ) { }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  logoutUser() {
    this.router.navigateByUrl('/login');
    this.authService.logoutUser();
  }
}
