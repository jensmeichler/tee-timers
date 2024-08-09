import {Component, inject, Input} from '@angular/core';
import {Page} from '../../models/page.model';
import {AsyncPipe} from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {filter, map, startWith} from "rxjs";

@Component({
  selector: 'tt-nav-bar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() nodes: Page[] = [];

  protected readonly isHomePage$ = inject(Router).events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => location.pathname === '/'),
    startWith(location.pathname === '/'),
  );

  protected sortNodes(nodes: Page[]): Page[] {
    return nodes.sort((a, b) => (a.menuIndex || 0) - (b.menuIndex || 0));
  }
}
