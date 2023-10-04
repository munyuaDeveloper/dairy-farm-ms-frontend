import { HostListener, Injectable, NgZone, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = false;
  menus = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'simple',
      link: '/dashboard/home'
    },
    {
      title: 'Milk Collection',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'simple',
      link: '/dashboard/milk-records'
    },
    {
      title: 'Information',
      icon: 'fa fa-info-circle',
      active: false,
      type: 'dropdown',
      badge: {
        text: '2',
        class: 'bg-danger'
      },
      submenus: [
        {
          title: 'Staffs',
          link: '/dashboard/staffs'
        },
        {
          title: 'Cows',
          link: '/dashboard/cows'
        }
      ]
    },
    {
      title: 'Sale',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Cow Sales',
          link: '/dashboard/cow-sales'
        },
        // {
        //   title: 'Milk',
        //   link: '/dashboard/milk-sales'
        // },
        // {
        //   title: 'Milk Report',
        //   link: '/dashboard/milk-sales-report'
        // },
        // {
        //   title: 'Cow Report',
        //   link: '/dashboard/cow-sales-report'
        // }
      ]
    },
    // {
    //   title: 'Monitoring',
    //   icon: 'fa fa-desktop',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Vaccine',
    //       link: '/dashboard/vaccine'
    //     },
    //     {
    //       title: 'Feed',
    //       link: '/dashboard/feed'
    //     }
    //   ]
    // },

  ];

  deviceWidth!: number;

  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}