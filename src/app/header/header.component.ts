import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Fixed typo in 'app-restaruants'
      console.log(this.searchQuery);
      this.router.navigate(['app-restaruants', this.searchQuery]);
      this.searchQuery = '';
    }
    else {
      alert('Please enter a search term.'); // Alert if the input is empty
    }
  }
}