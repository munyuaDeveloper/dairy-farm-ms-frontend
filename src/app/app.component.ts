import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from './layout/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dairy-farm-management system';
  public getScreenWidth: any;


  constructor(private sidebarService: SidebarService){}

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth < 767.9) {
      this.sidebarService.toggled = true
    }else{
      this.sidebarService.toggled = false
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth < 767.9) {
      this.sidebarService.toggled = true
    }else{
      this.sidebarService.toggled = false
    }
  }
}
