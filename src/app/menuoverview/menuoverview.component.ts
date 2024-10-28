import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from '../model/datastructure';
import { NotificationService } from '../service/notification.service';
import { MenuItemService } from '../service/menuitem.service';
import { Menu } from '../model/datastructure';

@Component({
  selector: 'app-menuitem-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './menuoverview.component.html',
  styleUrls: ['./menuoverview.component.css']
})
export class MenuOverviewComponent implements OnInit {
  menuItems: MenuItem[] = [];
  displayedMenuItems: MenuItem[] = [];
  selectedMenuItem: MenuItem | null = null;
  isAddMenuItemModalOpen: boolean = false;
  notificationMessage: string | null = null;
  loading: boolean = false;
  menus: Menu[] = []; 
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  addMenuItemForm: FormGroup;

  constructor(
    private menuItemService: MenuItemService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.addMenuItemForm = this.fb.group({
      menuItemID: [0],
      menuID: [0, Validators.required],
      itemName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      specialDietaryInfo: [''],
      tasteInfo: [''],
      nutritionalInfo: [''],
      availabilityTime: [''],
      isInStock: [true],
      imageUrl: ['', Validators.required],
      isAvailable: [true],
      discounts: [0],
      createdDate: [new Date()]
    });
  }

  ngOnInit(): void {
    this.fetchMenuItems();
    this.fetchMenus();
    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;
    });
  }

  fetchMenuItems(): void {
    this.loading = true;
    this.menuItemService.getAllMenuItems().subscribe({
      next: (menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
        this.totalItems = menuItems.length; 
        this.updateDisplayedItems();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching menu items:', err);
      }
    });
  }

  fetchMenus(): void {
    this.menuItemService.getAllMenus().subscribe({
      next: (menus: Menu[]) => {
        this.menus = menus;
      },
      error: (err) => {
        console.error('Error fetching menus:', err);
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
      console.log('Menu item added:', menuItemData);
      this.menuItemService.createMenuItem(menuItemData).subscribe({
        next: () => {
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
    this.menuItemService.deleteMenuItem(menuItem.menuItemID).subscribe({
      next: () => {
        this.fetchMenuItems();
        this.notificationService.show('Menu item has been deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting menu item:', err);
      }
    });
  }

  cancel(): void {
    this.selectedMenuItem = null;
  }

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

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  viewDetails(menuItem: MenuItem) {
    this.selectedMenuItem = menuItem; 
  }

  closeMenuItemDetails() {
    this.selectedMenuItem = null; 
  }
}
