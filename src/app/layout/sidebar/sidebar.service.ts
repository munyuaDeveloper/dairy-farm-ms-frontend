import { Injectable } from '@angular/core';

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
      link: '/dashboard'
    },
    {
      title: 'Information',
      icon: 'fa fa-info-circle',
      active: true,
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
      title: 'Monitoring',
      icon: 'fa fa-desktop',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Vaccine',
          link: '/dashboard/vaccine'
        },
        {
          title: 'Feed',
          link: '/dashboard/feed'
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
          title: 'Milk',
          link: '/dashboard/milk-sales'
        },
        {
          title: 'Milk Report',
          link: '/dashboard/milk-sales-report'
        },
        {
          title: 'Cow',
          link: '/dashboard/cow-sales'
        },
        {
          title: 'Cow Report',
          link: '/dashboard/cow-sales-report'
        }
      ]
    },
    {
      title: 'Milk Collection',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'simple',
      link: '/dashboard/milk-records'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
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