import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PayloadService } from '../service/payload.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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
  userRole: string | null = null;
  private userSubscription!: Subscription;

  constructor(private router: Router, private payloadService: PayloadService) {}

  ngOnInit(): void {
    // Subscribe to the userName observable
    this.userSubscription = this.payloadService.userName$.subscribe(userName => {
      this.userName = userName;
      this.userRole = this.payloadService.getUserRole();
      console.log('User Name:', this.userName);
      console.log('User Role:', this.userRole);
    });

    // Retrieve the role initially in case the observable hasn't emitted yet
    this.userRole = this.payloadService.getUserRole();
    console.log('Initial User Role:', this.userRole);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log(this.searchQuery);
      this.router.navigate(['app-restaruants', this.searchQuery]);
      this.searchQuery = '';
    } else {
      // SweetAlert2 alert if the search term is empty
      Swal.fire({
        icon: 'warning',
        title: 'Empty Search',
        text: 'Please enter a search term to proceed.',
      });
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
