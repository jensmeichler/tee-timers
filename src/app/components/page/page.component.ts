import {Component, inject} from '@angular/core';
import {ContentfulService} from '../../services/contentful.service';
import {map} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {NgxContentfulRichTextModule} from 'ngx-contentful-rich-text';

@Component({
  selector: 'tt-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgxContentfulRichTextModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  protected content$ = inject(ContentfulService).pages$.pipe(
    map((pages) => pages.find((page) => page.route === window.location.pathname)),
    map((page) => page?.content)
  );
}
