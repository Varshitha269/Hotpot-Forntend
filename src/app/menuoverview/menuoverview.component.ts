import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from '../model/datastructure';
import { NotificationService } from '../service/notification.service';
import { MenuitemjoinedService } from '../service/menuitemjoined.service';

@Component({
  selector: 'app-menuitem-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './menuoverview.component.html',
  styleUrls: ['./menuoverview.component.css']
})
export class MenuOverviewComponent implements OnInit {
  menuItems: MenuItem[] = [];
  displayedMenuItems: MenuItem[] = []; // Items to display on the current page
  selectedMenuItem: MenuItem | null = null;
  isAddMenuItemModalOpen: boolean = false;
  notificationMessage: string | null = null;
  loading: boolean = false;
  
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  // Reactive Form for adding a new menu item
  addMenuItemForm: FormGroup;

  constructor(
    private menuItemService: MenuitemjoinedService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.addMenuItemForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchMenuItems();
    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;
    });
  }

  fetchMenuItems(): void {
    this.loading = true;
    this.menuItemService.getAllMenuItems().subscribe({
      next: (menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
        this.totalItems = menuItems.length; // Total items for pagination
        this.updateDisplayedItems();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching menu items:', err);
      }
    });
  }

  updateDisplayedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedMenuItems = this.menuItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  showAddMenuItemModal(): void {
    this.isAddMenuItemModalOpen = true;
  }

  closeAddMenuItemModal(): void {
    this.isAddMenuItemModalOpen = false;
    this.addMenuItemForm.reset();
  }

  createMenuItem(): void {
    if (this.addMenuItemForm.valid) {
      const menuItemData = this.addMenuItemForm.value;
      this.menuItemService.addMenuItem(menuItemData).subscribe({
        next: (menuItem) => {
          this.fetchMenuItems();
          this.closeAddMenuItemModal();
          this.notificationService.show('New menu item has been added successfully!');
        },
        error: (err) => {
          console.error('Error adding menu item:', err);
        }
      });
    }
  }

  deleteMenuItem(menuItem: MenuItem): void {
    this.menuItemService.deleteMenuItem(menuItem.menuItemID).subscribe(() => {
      this.fetchMenuItems();
      this.notificationService.show('Menu item has been deleted successfully!');
    });
  }

  // viewDetails(menuItem: MenuItem): void {
  //   this.selectedMenuItem = menuItem;
  // }

  cancel(): void {
    this.selectedMenuItem = null;
  }

  // Pagination methods
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedItems();
    }
  }

  // New method to calculate total pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }


  // Method to open the MenuItem details modal
  viewDetails(menuItem: MenuItem) {
    this.selectedMenuItem = menuItem; // Set the selected menu item to display its details
  }

  // Method to close the MenuItem details modal
  closeMenuItemDetails() {
    this.selectedMenuItem = null; // Reset the selected menu item and close the modal
  }
}
