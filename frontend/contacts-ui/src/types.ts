import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Contact {
  _id: string;
  name: string;
  address: string;
  phone: string;
  notes: string;
}

export interface Contacts {
  contacts: Contact[];
}

export interface PaginationParams {
  page: number;
  perPage: number;
}
