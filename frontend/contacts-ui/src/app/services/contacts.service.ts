import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Contacts } from '../../types';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  private url = 'http://localhost:3000/api/contacts';

  getContacts(
    page: number,
    limit: number,
    filter?: { name?: string; address?: string; phone?: string; notes?: string }
  ): Observable<any> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (filter?.name) {
      params = params.set('name', filter.name);
    }
    if (filter?.address) {
      params = params.set('address', filter.address);
    }
    if (filter?.phone) {
      params = params.set('phone', filter.phone);
    }
    if (filter?.notes) {
      params = params.set('notes', filter.notes);
    }

    return this.http.get(this.url, { params });
  }

  updateContact(id: string, contact: any): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, contact);
  }

  deleteContact(contactId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${contactId}`);
  }

  createContact(contact: any): Observable<void> {
    return this.http.post<void>(`${this.url}`, contact);
  }

  unlockContact(contactId: string): Observable<void> {
    return this.http.put<void>(`${this.url}/${contactId}/unlock`, {});
  }

  lockContact(contactId: string): Observable<void> {
    return this.http.put<void>(`${this.url}/${contactId}/lock`, {});
  }
}
