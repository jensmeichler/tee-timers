import {Injectable} from '@angular/core';
import {createClient} from 'contentful';
import {CONTENTFUL_CONFIG} from '../config/contentful-client.config';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = createClient(CONTENTFUL_CONFIG);

  constructor() {
  }
}
