import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service'; // Use the correct service
import { User } from '../model/user.model';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-customeroverview',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customeroverview.component.html',
  styleUrls: ['./customeroverview.component.css']
})
export class CustomeroverviewComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number = 1;
  pageSize: number = 10;
  loading: boolean = false;
  selectedUser: User | null = null;
  isAddUserModalOpen: boolean = false;
  totalPages: number = 0;
  notificationMessage: string | null = null;

  addUserForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.addUserForm = this.fb.group({
      userID: [0],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      createdDate: [new Date()],
      role: ['user', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;
    });
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.setPage(this.currentPage);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;
      }
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, startIndex + this.pageSize);
  }

  showAddUserModal(): void {
    this.isAddUserModalOpen = true;
  }

  closeAddUserModal(): void {
    this.isAddUserModalOpen = false;
    this.addUserForm.reset();
  }

  createUser(): void {
    if (this.addUserForm.valid) {
      const userData = this.addUserForm.value;
      this.userService.addUserDetails(userData).subscribe({
        next: () => {
          this.fetchUsers();
          this.closeAddUserModal();
          this.notificationService.show('New user has been added successfully!');
        },
        error: (err) => {
          console.error('Error adding user:', err);
        }
      });
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.userService.deleteUserDetails(user.userID).subscribe(() => {
        this.fetchUsers();
        this.notificationService.show('User has been deleted successfully!');
      }, err => {
        console.error('Error deleting user:', err);
      });
    }
  }

  viewDetails(user: User): void {
    this.selectedUser = user;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  cancel(): void {
    this.selectedUser = null;
  }
}
