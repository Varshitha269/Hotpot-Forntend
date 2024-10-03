import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MenuItemService } from '../service/menuitem.service'; // Import MenuItemService
import { RestaurantService } from '../service/restaurant.service'; // Import RestaurantService
import { MenuService } from '../service/menu.service'; // Import MenuService
import { MenuItem } from '../model/datastructure';

interface Menu {
  menuID: number;
  menuName: string;
}

@Component({
  selector: 'app-menuitems',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, ReactiveFormsModule],
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuitemsComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menus: Menu[] = []; // Hold menus for the restaurant
  selectedMenuID: number | null = null; // Hold selected menu ID
  menuItemForm: FormGroup;
  editingMenuItemId: number | null = null;
  showForm: boolean = false; // Toggle visibility of the form
  restaurantID: number = 0; // Initialize restaurantID

  constructor(
    private fb: FormBuilder,
    private menuItemService: MenuItemService, // Inject MenuItemService
    private restaurantService: RestaurantService, // Inject RestaurantService
    private menuService: MenuService, // Inject MenuService
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.menuItemForm = this.fb.group({
      menuItemID: [0], // This will be set only when editing
      menuID: [0, Validators.required], // menuID will be required
      itemName: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      specialDietaryInfo: [''],
      tasteInfo: [''],
      nutritionalInfo: [''],
      availabilityTime: [''],
      isInStock: [true],
      imageUrl: [''],
      isAvailable: [true],
      discounts: [0],
      createdDate: [new Date()]
    });
  }

  ngOnInit(): void {
    this.fetchRestaurantId(); // Fetch restaurant ID when component initializes
  }

  // Fetch the restaurant ID dynamically
  fetchRestaurantId() {
    this.restaurantService.getRestaurantByName().subscribe({
      next: (restaurantId) => {
        this.restaurantID = Number(restaurantId); // Store the restaurant ID
        console.log(`Restaurant ID: ${this.restaurantID}`);

        // Once restaurant ID is retrieved, load the menus for this restaurant
        this.loadMenus(this.restaurantID);
      },
      error: (err) => {
        console.error('Error fetching restaurant ID:', err);
      }
    });
  }

  // Load menus by restaurantID from API
  loadMenus(restaurantID: number) {
    this.menuService.getMenusByRestaurantId(restaurantID).subscribe({
      next: (menus: Menu[]) => {
        this.menus = menus;
        this.cdr.detectChanges(); // Trigger change detection manually
      },
      error: (error) => {
        console.error('Error loading menus for restaurant:', error);
      }
    });
  }

  // Handle menu selection and load menu items based on selected menuID
  onMenuSelect(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast event.target to HTMLSelectElement
    const menuID = target.value; // Now you can safely access value
    this.selectedMenuID = menuID ? parseInt(menuID, 10) : null; // Parse to integer
    if (this.selectedMenuID !== null) {
      this.loadMenuItems(this.selectedMenuID); // Load menu items only if selectedMenuID is not null
    }
    this.menuItemForm.patchValue({ menuID: this.selectedMenuID }); // Set the selected menu ID in the form
  }

  // Load menu items by menuID from API
  loadMenuItems(menuID: number) {
    this.menuItemService.getMenuItemsByMenuId(menuID).subscribe({
      next: (menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
        this.cdr.detectChanges(); // Trigger change detection manually
      },
      error: (error: any) => {
        console.error('Error loading menu items:', error);
      }
    });
  }

  // Submit the form for creating/updating a menu item
  onSubmit() {
    if (this.menuItemForm.invalid) {
      console.error('Form is invalid', this.menuItemForm.errors);
      return; // Handle form validation errors
    }

    // Create a new menu item object, excluding the menuItemID for new items
    const newMenuItem: MenuItem = {
      ...this.menuItemForm.value,
      menuID: this.selectedMenuID as number, // Set the selected menu ID
    };

    console.log('New Menu Item Data:', newMenuItem); // Log the data being sent

    // Handle create or update logic
    if (this.editingMenuItemId) {
      // Update existing menu item
      newMenuItem.menuItemID = this.editingMenuItemId; // Include menuItemID only for update
      this.menuItemService.updateMenuItem(newMenuItem).subscribe({
        next: () => {
          this.loadMenuItems(this.selectedMenuID as number);
          this.resetForm();
        },
        error: (err) => {
          console.error('Error updating menu item:', err);
          alert('Failed to update menu item. Please check the console for details.');
        }
      });
    } else {
      // Create new menu item
      this.menuItemService.createMenuItem(newMenuItem).subscribe({
        next: () => {
          this.loadMenuItems(this.selectedMenuID as number);
          this.resetForm();
        },
        error: (err: any) => {
          console.error('Error creating menu item:', err);
          alert('Failed to create menu item. Please check the console for details.');
        }
      });
    }
  }

  // Reset the form
  resetForm() {
    this.menuItemForm.reset();
    this.editingMenuItemId = null;
    this.selectedMenuID = null;
    this.showForm = false; // Hide the form after reset
  }

  // Toggle form visibility for adding/updating menu items
  toggleForm() {
    this.showForm = !this.showForm; // Toggle the showForm boolean
    if (!this.showForm) {
      this.resetForm(); // Reset the form when hiding
    }
  }

  // Placeholder for getting next menu item ID (implement this according to your logic)
  getNextMenuItemID(): number {
    return this.menuItems.length ? Math.max(...this.menuItems.map(item => item.menuItemID)) + 1 : 1;
  }

  // Method to edit a menu item
  editMenuItem(item: MenuItem) {
    this.menuItemForm.patchValue(item);
    this.editingMenuItemId = item.menuItemID;
    this.showForm = true; // Show the form when editing
  }

  // Method to delete a menu item
  deleteMenuItem(menuItemID: number) {
    this.menuItemService.deleteMenuItem(menuItemID).subscribe({
      next: () => {
        this.loadMenuItems(this.selectedMenuID as number);
      },
      error: (err) => console.error('Error deleting menu item:', err)
    });
  }
}
