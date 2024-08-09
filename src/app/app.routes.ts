import {Routes} from '@angular/router';
import {PageComponent} from './components/page/page.component';
import {map} from 'rxjs';
import {createContentfulClient, getContentfulPages} from './helpers/contentful.helper';
import {HomePageComponent} from '../app/components/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: '',
    loadChildren: () => getContentfulPages(createContentfulClient()).pipe(
      map((pages) => {
        const routes: Routes = [];
        pages.forEach((page) =>
          routes.push({
            title: page.title,
            path: page.route.substring(1),
            component: PageComponent,
          })
        );
        return routes;
      }))
  }
];
