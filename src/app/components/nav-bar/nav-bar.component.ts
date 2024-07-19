import {Component, Input} from '@angular/core';
import {Page} from '../../models/page.model';
import {AsyncPipe} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'tt-nav-bar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() nodes: Page[] | null = null;
}
