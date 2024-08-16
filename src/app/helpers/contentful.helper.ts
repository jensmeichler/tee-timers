import {CONTENTFUL_CONFIG} from '../config/contentful-client.config';
import {createClient} from 'contentful';
import {from, map} from 'rxjs';

export const createContentfulClient = () => createClient({
  space: atob(CONTENTFUL_CONFIG.space),
  accessToken: atob(CONTENTFUL_CONFIG.accessToken)
});

export const getContentfulPages = (client: ReturnType<typeof createContentfulClient>) =>
  from(client.getEntries({content_type: 'page'}))
    .pipe(
      map((collection) =>
        collection.items.map((item) => ({
          title: item.fields['title'] as string,
          description: item.fields['description'] as string | undefined,
          route: item.fields['route'] as string,
          content: item.fields['content'] as any | undefined,
          redirect: item.fields['redirect'] as string | undefined,
          availableInMenu: item.fields['availableInMenu'] as boolean,
          menuIndex: item.fields['menuIndex'] as number | undefined,
          availableOnHome: item.fields['availableOnHome'] as boolean,
          homeIndex: item.fields['homeIndex'] as number | undefined,
          availableInFooter: item.fields['availableInFooter'] as boolean,
          footerIndex: item.fields['footerIndex'] as number | undefined
        }))
      )
    );

export const getContentfulHomePage = (client: ReturnType<typeof createContentfulClient>) =>
  from(client.getEntries({content_type: 'homepage'}))
    .pipe(
      map((collection) => {
          const item = collection.items[0].fields;
          const images = ((item?.['images'] ?? []) as any[]).map((image) => image.fields.file.url);
          return {
            heroTitle: item?.['heroTitle'] as string,
            heroText: item?.['heroText'] as string,
            heroCta1: item?.['heroCta1'] as string,
            heroCta1Link: item?.['heroCta1Link'] as string,
            heroCta2: item?.['heroCta2'] as string | undefined,
            heroCta2Link: item?.['heroCta2Link'] as string | undefined,
            imageSources: images,
          };
        }
      )
    );

export const getContentfulTeeTimersLogo = (client: ReturnType<typeof createContentfulClient>) =>
  from(client.getEntries({content_type: 'logo'}))
    .pipe(
      map((collection) => {
        const file = collection.items[0].fields?.['file'] as any;
        return file.fields.file.url as string;
      })
    );
