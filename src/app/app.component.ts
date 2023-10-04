import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from './layout/sidebar/sidebar.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Event, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public getScreenWidth: any;
  loading = false;

  constructor(private sidebarService: SidebarService, private router: Router) { }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.toggleSidebar()
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(()=> { this.loading = false;},500)
          this.toggleSidebar();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  toggleSidebar() {
    if (this.getScreenWidth < 767.9) {
      this.sidebarService.toggled = true
    } else {
      this.sidebarService.toggled = false
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.toggleSidebar()
  }
}
