import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);

  users = signal<User[]>([]);

  ngOnInit() {
    this.http.get<User[]>('http://localhost:3000/api/users').subscribe({
      next: (data) => {
        this.users.set(data);
        console.log('Users fetched:', data);
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }
}
