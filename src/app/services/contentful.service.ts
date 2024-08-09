import {Injectable} from '@angular/core';
import {map, Observable, shareReplay} from 'rxjs';
import {Page} from '../models/page.model';
import {createContentfulClient, getContentfulHomePage, getContentfulPages} from '../helpers/contentful.helper';
import {HomePage} from '../models/home-page.model';

@Injectable({providedIn: 'root'})
export class ContentfulService {
  private client = createContentfulClient();
  public homePage$: Observable<HomePage> = getContentfulHomePage(this.client).pipe(shareReplay(1)) as any;
  public pagesFlat$: Observable<Page[]> = getContentfulPages(this.client).pipe(shareReplay(1));
  public navTree$: Observable<Page[]> = this.pagesFlat$.pipe(
    map((pages) => {
      const tree: Page[] = [];
      pages
        .filter((page) => page.availableInMenu)
        .sort((a, b) => a.route.length - b.route.length)
        .forEach((page) => {
          const parts = page.route.split('/').filter((part) => part);
          if (parts.length <= 1) {
            tree.push({...page, children: []});
          } else {
            const parent = tree.find((node) => node.route === `/${parts[0]}`);
            parent?.children?.push(page);
          }
        });
      return tree;
    })
  );
}
