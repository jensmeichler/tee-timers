import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../models/page.model';
import {createContentfulClient, getContentfulPages} from '../helpers/contentful.helper';

@Injectable({providedIn: 'root'})
export class ContentfulService {
  private client = createContentfulClient();
  public pages$: Observable<Page[]> = getContentfulPages(this.client);
}
