import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../service/menu.service';
import { RestaurantService } from '../service/restaurant.service'; // Import the restaurant service

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
  restaurants: any[] = []; // To store list of restaurants
  showForm: boolean = false;
  page: number = 1;
  pageSize: number = 10;

  loading: boolean = false;
  notificationMessage: string | null = null;
  isAddMenuModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private restaurantService: RestaurantService // Inject restaurant service
  ) {
    this.menuForm = this.fb.group({
      menuID: [0], // Let the server generate menuID
      menuName: ['', [Validators.required, Validators.minLength(3)]], // Ensure menuName is valid
      description: [''],
      restaurantID: [null, Validators.required], // Restaurant selection is required
      createdDate: [new Date().toISOString(), Validators.required],
      isActive: [true], // Default to active
    });
  }

  ngOnInit() {
    this.loadMenus();
    this.loadRestaurants(); // Load restaurants on component initialization
  }

  // Load all menus from the service
  loadMenus() {
    this.loading = true; // Set loading to true while fetching data
    this.menuService.getAllMenus().subscribe(
      (menus) => {
        this.menus = menus;
        this.loading = false; // Set loading to false after data is fetched
      },
      (error) => {
        this.loading = false; // Handle error and set loading to false
        console.error('Error loading menus:', error); // Log the error
        this.notificationMessage = 'Error loading menus'; // Set error message
      }
    );
  }

  // Load all restaurants for dropdown
  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (restaurants: any[]) => {
        this.restaurants = restaurants; // Populate restaurant dropdown with data
      },
      (error) => {
        console.error('Error loading restaurants:', error); // Log the error
        this.notificationMessage = 'Error loading restaurants'; // Handle error loading restaurants
      }
    );
  }

  // Display add menu form
  showAddMenuForm() {
    this.menuForm.reset(); // Reset the form
    this.menuForm.patchValue({
      isActive: true, // Set default values if needed
      createdDate: new Date().toISOString(),
    });
    this.notificationMessage = null; // Clear previous notification messages
    this.isAddMenuModalOpen = true; // Open modal for adding menu
  }

  // Submit the form to create a new menu
  onSubmit() {
    if (this.menuForm.invalid) {
      this.notificationMessage = 'Form is invalid, please correct the errors.';
      return;
    }

    // Log the form value before submission
    console.log('Creating menu with data:', this.menuForm.value);

    // Create new menu with selected restaurant ID
    this.menuService.createMenu(this.menuForm.value).subscribe(
      (response) => {
        console.log('Menu created successfully:', response); // Log success response
        this.loadMenus();
        this.notificationMessage = 'Menu created successfully'; // Success message
        this.closeAddMenuModal(); // Close the modal after creation
      },
      (error) => {
        console.error('Error creating menu:', error); // Log the error
        if (error.status === 400 && error.error.errors) {
          this.notificationMessage = 'Validation failed: ' + JSON.stringify(error.error.errors);
        } else {
          this.notificationMessage = 'Error creating menu: ' + error.message;
        }
      }
    );
  }

  // Delete a menu by its ID
  deleteMenu(menuID: number) {
    if (!confirm('Are you sure you want to delete this menu?')) {
      return; // Confirmation before deletion
    }

    // Log the menu ID being deleted
    console.log('Deleting menu with ID:', menuID);

    this.menuService.deleteMenu(menuID).subscribe(
      () => {
        this.loadMenus();
        this.notificationMessage = 'Menu deleted successfully'; // Success message
      },
      (error) => {
        console.error('Error deleting menu:', error); // Log the error
        this.notificationMessage = 'Error deleting menu: ' + error.message; // Error message
      }
    );
  }

  // Change pagination page
  changePage(newPage: number) {
    this.page = newPage;
  }

  // Get the list of paginated menus for display
  get paginatedMenus() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.menus.slice(startIndex, startIndex + this.pageSize);
  }

  // Get total pages for pagination
  get totalPages() {
    return Math.ceil(this.menus.length / this.pageSize);
  }

  // Modal-related methods
  showAddMenuModal() {
    this.isAddMenuModalOpen = true; // Opens the modal for adding a menu
  }

  closeAddMenuModal() {
    this.isAddMenuModalOpen = false; // Closes the modal
    this.menuForm.reset(); // Reset the form after closing
  }

  createMenu() {
    this.onSubmit(); // Call onSubmit to create a menu
  }
}
