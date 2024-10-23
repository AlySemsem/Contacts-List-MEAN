import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  users: User[] = [
    { username: 'user1', password: 'user1' },
    { username: 'user2', password: 'user2' },
  ];

  constructor(private router: Router) {}

  login(): void {
    const user = this.users.find(
      (u) => u.username === this.username && u.password === this.password
    );

    if (user) {
      this.router.navigate(['/contact-list']);
    } else {
      alert('Invalid username or password');
    }
  }
}
