import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar-next';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    BsDropdownModule,
    RouterModule,
  ],
  providers: [
    SidebarService
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  menus: any = [];

  constructor(
    public sidebarservice: SidebarService,
    private authService: AuthService,
    private router: Router) {
    this.menus = sidebarservice.getMenuList();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu: { type: string; active: boolean; }) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element: any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: { active: any; }) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  logoutUser() {
    this.router.navigateByUrl('/login');
    this.authService.logoutUser();
  }

}
