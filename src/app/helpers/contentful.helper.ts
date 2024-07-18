import {CONTENTFUL_CONFIG} from '../config/contentful-client.config';
import {createClient} from 'contentful';
import {from, map} from "rxjs";

export const createContentfulClient = () => createClient(CONTENTFUL_CONFIG);

export const getContentfulPages = (client: ReturnType<typeof createContentfulClient>) =>
  from(client.getEntries({content_type: 'page'}))
    .pipe(
      map((collection) =>
        collection.items.map((item) => ({
          title: item.fields['title'] as string,
          description: item.fields['description'] as string | undefined,
          route: item.fields['route'] as string,
          content: item.fields['content'] as string | undefined
        }))
      )
    );
