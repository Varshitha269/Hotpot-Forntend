import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Menu } from '../model/datastructure';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-menumanagement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './menumanagement.component.html',
  styleUrls: ['./menumanagement.component.css'],
})
export class MenumanagementComponent implements OnInit {
  menuForm: FormGroup;
  menus: any[] = [];
  showForm: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  
  // Add the missing properties
  loading: boolean = false;
  notificationMessage: string | null = null;
  isAddMenuModalOpen: boolean = false;

  constructor(private fb: FormBuilder, private menuService: MenuService) {
    this.menuForm = this.fb.group({
      menuName: ['', Validators.required],
      description: [''],
      isActive: [false],
    });
  }

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    this.loading = true;  // Set loading to true while fetching data
    this.menuService.getAllMenus().subscribe(menus => {
      this.menus = menus;
      this.loading = false;  // Set loading to false after data is fetched
    }, error => {
      this.loading = false;  // Handle error and set loading to false
      this.notificationMessage = 'Error loading menus';  // Set error message
    });
  }

  showAddMenuForm() {
    this.showForm = true;
    this.menuForm.reset();
  }

  onSubmit() {
    // Create new menu
    this.menuService.createMenu(this.menuForm.value).subscribe(() => {
      this.loadMenus();
      this.showForm = false;
      this.notificationMessage = 'Menu created successfully';  // Success message
    }, error => {
      this.notificationMessage = 'Error creating menu';  // Error message
    });
    this.menuForm.reset();
  }

  deleteMenu(menuID: number) {
    this.menuService.deleteMenu(menuID).subscribe(() => {
      this.loadMenus();
      this.notificationMessage = 'Menu deleted successfully';  // Success message
    }, error => {
      this.notificationMessage = 'Error deleting menu';  // Error message
    });
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  get paginatedMenus() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.menus.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.menus.length / this.pageSize);
  }

  // Define the missing methods
  showAddMenuModal() {
    this.isAddMenuModalOpen = true; // Opens the modal for adding a menu
  }

  closeAddMenuModal() {
    this.isAddMenuModalOpen = false; // Closes the modal
  }

  createMenu() {
    this.onSubmit(); // Call onSubmit to create a menu
  }
}
