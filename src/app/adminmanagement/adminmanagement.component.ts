import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminmanagement',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, RouterModule],
  templateUrl: './adminmanagement.component.html',
  styleUrls: ['./adminmanagement.component.css']
})
export class AdminmanagementComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  editingUser: User | null = null;
  page: number = 1;
  pageSize: number = 10;
  filteredUsers: User[] = [];
  roles: string[] = ['Admin', 'Restaurant', 'User'];
  selectedRole: string = '';
  showForm: boolean = false;
  activeFilter: string = ''; // New property to track active/inactive filter


  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phNo: [''],
      addressLine: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      country: [''],
      role: ['', Validators.required],
      isActive: [true],
      createdDate: [new Date()],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];

    // Generate initial users if no users exist
    if (this.users.length === 0) {
      for (let i = 1; i <= 150; i++) {
        this.users.push(this.createUser(i));
      }
    }

    this.updateFilteredUsers();
  }

  createUser(id: number): User {
    return {
      userID: id,
      username: `User ${id}`,
      email: `user${id}@example.com`,
      password: `password${id}`,
      phNo: `12345678${id}`,
      addressLine: `Address ${id}`,
      city: `City ${id}`,
      state: `State ${id}`,
      postalCode: `1234${id}`,
      country: `Country ${id}`,
      role: this.roles[Math.floor(Math.random() * this.roles.length)],
      createdDate: new Date(),
      isActive: id % 2 === 0,
    };
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    if (this.editingUser) {
      const index = this.users.findIndex(user => user.userID === this.editingUser?.userID);
      if (index !== -1) {
        this.users[index] = { ...this.userForm.value, userID: this.editingUser.userID };
      }
    } else {
      const newUserID = this.users.length > 0 ? Math.max(...this.users.map(u => u.userID)) + 1 : 1;
      const newUser: User = { ...this.userForm.value, userID: newUserID };
      this.users.push(newUser);
    }

    this.updateLocalStorage();
    this.resetForm();
    this.updateFilteredUsers();
  }

  updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  resetForm() {
    this.userForm.reset({ isActive: true, createdDate: new Date() });
    this.editingUser = null;
    this.showForm = false;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue(user);
    this.showForm = true;
  }

  deleteUser(user: User) {
    this.users = this.users.filter(u => u.userID !== user.userID);
    this.updateLocalStorage();
    this.updateFilteredUsers();
  }

  deactivateUser(user: User) {
    user.isActive = false;
    this.updateLocalStorage();
    this.updateFilteredUsers();
  }

  activateUser(user: User) {
    user.isActive = true;
    this.updateLocalStorage();
    this.updateFilteredUsers();
  }

  updateFilteredUsers() {
    this.filteredUsers = this.users
      .filter(user => 
        (this.selectedRole ? user.role === this.selectedRole : true) &&
        (this.activeFilter ? (this.activeFilter === 'active' ? user.isActive : !user.isActive) : true)
      )
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }
  
  filterByActiveStatus() {
    this.page = 1; // Reset to the first page when filtering
    this.updateFilteredUsers();
  }
  
  changePage(page: number) {
    this.page = page;
    this.updateFilteredUsers();
  }

  filterByRole() {
    this.page = 1; // Reset to the first page when filtering
    this.updateFilteredUsers();
  }

  showAddUserForm() {
    this.editingUser = null;
    this.resetForm();
    this.showForm = true;
  }
}
