import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menuMock } from '../../mocks/menu.mock';

@Component({
  selector: 'app-core-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isCollapsed: boolean = true;
  menuList: Array<any> = menuMock;

  constructor(private router: Router) {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  handleNavigatePage(page) {
    this.router.navigate([`${page.route}`]);
  }
}
