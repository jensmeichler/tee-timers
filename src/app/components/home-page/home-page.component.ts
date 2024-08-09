import {AsyncPipe} from "@angular/common";
import {Component, inject} from '@angular/core';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import {ContentfulService} from "../../services/contentful.service";
import {HomePage} from '../../models/home-page.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'tt-home-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  protected documentToHtmlString = documentToHtmlString;
  protected homePage$: Observable<HomePage> = inject(ContentfulService).homePage$;
}
