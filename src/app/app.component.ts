import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ContentfulService} from './services/contentful.service';
import {AsyncPipe} from '@angular/common';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected nodes$ = inject(ContentfulService).navTree$;
}
