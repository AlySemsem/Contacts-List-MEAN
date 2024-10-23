import { Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'contact-list',
    component: ContactsListComponent,
  },
  { path: '', component: LoginComponent },
];
