import {AsyncPipe, JsonPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {BLOCKS} from '@contentful/rich-text-types';
import {documentToHtmlString, Options} from '@contentful/rich-text-html-renderer';
import {ContentfulService} from '../../services/contentful.service';
import {map} from 'rxjs';

@Component({
  selector: 'tt-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  /** Default see https://github.com/contentful/rich-text/blob/master/packages/rich-text-html-renderer/src/index.ts */
  private renderOptions: Partial<Options> = {
    renderNode: {
      [BLOCKS.TABLE]: (node, next) => `<table class="table table-striped">${next(node.content)}</table>`,
      [BLOCKS.TABLE_ROW]: (node, next) => `<tr>${next(node.content)}</tr>`,
      [BLOCKS.TABLE_HEADER_CELL]: (node, next) => `<th class="paragraph-m-0">${next(node.content)}</th>`,
      [BLOCKS.TABLE_CELL]: (node, next) => `<td class="paragraph-m-0">${next(node.content)}</td>`,
    }
  };

  protected content$ = inject(ContentfulService).pagesFlat$.pipe(
    map((pages) => pages.find((page) => page.route === window.location.pathname.replace('/tee-timers', ''))),
    map((page) => page ? documentToHtmlString(page.content, this.renderOptions) : null),
  );
}
