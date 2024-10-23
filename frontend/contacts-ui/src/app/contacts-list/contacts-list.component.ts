import { Component } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css',
})
export class ContactsListComponent {
  constructor(private contactsService: ContactsService) {}

  contacts: any[] = [];
  totalContacts: number = 0;
  page: number = 1;
  pageSize: number = 5;
  showInlineForm: boolean = false;
  newContact: any = { name: '', address: '', phone: '', notes: '' };
  editContactId: string | null = null;
  currentEditingContact: string | null = null;

  private socket: any;

  filteredContacts: any[] = [];
  filterName: string = '';
  filterAddress: string = '';
  filterPhone: string = '';
  filterNotes: string = '';

  Math = Math;

  ngOnInit(): void {
    this.loadContacts();
    this.setupSocket();
  }

  setupSocket(): void {
    this.socket = io('http://localhost:3000');

    this.socket.on('contactLocked', (contact: any) => {
      const index = this.contacts.findIndex((c) => c._id === contact._id);
      if (index !== -1) {
        this.contacts[index].locked = true;
      }
    });

    this.socket.on('contactUnlocked', (contact: any) => {
      const index = this.contacts.findIndex((c) => c._id === contact._id);
      if (index !== -1) {
        this.contacts[index].locked = false;
      }
      this.loadContacts();
    });

    this.socket.on('contactUpdated', (updatedContact: any) => {
      console.log(updatedContact);

      const index = this.contacts.findIndex(
        (c) => c._id === updatedContact._id
      );
      if (index !== -1) {
        this.contacts[index] = updatedContact;
      }
    });
  }

  lockContact(contactId: string): void {
    this.contactsService.lockContact(contactId).subscribe(() => {});
  }

  unlockContact(contactId: string): void {
    this.contactsService.unlockContact(contactId).subscribe(() => {});
  }

  startEditingContact(contactId: string) {
    if (
      this.currentEditingContact &&
      this.currentEditingContact !== contactId
    ) {
      this.finishEditingContact(this.currentEditingContact);
    }
    this.currentEditingContact = contactId;
    this.lockContact(contactId);
  }

  finishEditingContact(contactId: string) {
    this.unlockContact(contactId);

    this.currentEditingContact = null;
  }

  loadContacts(): void {
    console.log(this.filterName);

    this.contactsService
      .getContacts(this.page, this.pageSize, {
        name: this.filterName,
        address: this.filterAddress,
        phone: this.filterPhone,
        notes: this.filterNotes,
      })
      .subscribe((response: any) => {
        console.log(response);

        this.contacts = response.contacts;
        this.totalContacts = response.total;
        this.filteredContacts = [...this.contacts];
      });
  }

  deleteContact(contactId: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactsService.deleteContact(contactId).subscribe(() => {
        this.loadContacts();
      });
    }
  }

  editContact(contact: any): void {
    this.editContactId = contact._id;
    this.newContact = {
      name: contact.name,
      address: contact.address,
      phone: contact.phone,
      notes: contact.notes,
    };
  }

  updateContact(): void {
    if (this.editContactId) {
      this.contactsService
        .updateContact(this.editContactId, this.newContact)
        .subscribe(() => {
          this.loadContacts();
          this.resetNewContact();
          this.editContactId = null;
        });
      this.socket.emit('updateContact', {
        id: this.editContactId,
        updatedData: this.newContact,
      });

      // Unlock the contact after editing
      this.finishEditingContact(this.editContactId);
    }
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadContacts();
  }

  addContact(): void {
    this.contactsService.createContact(this.newContact).subscribe(() => {
      this.loadContacts();
      this.resetNewContact();
    });
  }

  resetNewContact(): void {
    this.newContact = { name: '', email: '', phone: '' };
    this.showInlineForm = false;
  }
}
