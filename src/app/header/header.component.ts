import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PayloadService } from '../service/payload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  cartItemCount: number = 0;
  userName: string | null = null; 
  userRole: string | null = null; // User role property
  private userSubscription!: Subscription;

  constructor(private router: Router, private payloadService: PayloadService) {}

  ngOnInit(): void {
    // Subscribe to the userName observable
    this.userSubscription = this.payloadService.userName$.subscribe(userName => {
      this.userName = userName; // Update userName whenever it changes
      this.userRole = this.payloadService.getUserRole(); // Get user role here
      console.log('User Name:', this.userName);
      console.log('User Role:', this.userRole); // Log the user role for debugging
    });

    // Also retrieve the role initially in case the observable hasn't emitted yet
    this.userRole = this.payloadService.getUserRole(); // Initialize user role
    console.log('Initial User Role:', this.userRole); // Log initial role for debugging
  }

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

  

  logout(): void {
    this.payloadService.logout();
  }

  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
