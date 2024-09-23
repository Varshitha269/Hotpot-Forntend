import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import localeIn from '@angular/common/locales/en-IN';

registerLocaleData(localeIn, 'en-IN');

interface Product {
  name: string; 
  price: number;
  quantity: number;
  linePrice: number;
}

@Component({
  selector: 'app-cartitems',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.css'],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' } 
  ]
})
export class CartitemsComponent {
  taxRate = 0.05;
  shippingRate = 15.00;
  products: Product[] = []; 
  subtotal: number = 0;
  tax: number = 0;
  shipping: number = 0;
  total: number = 0;

  constructor(private fb: FormBuilder) {
    this.products = [
      { name: 'Pizza', price: 15, quantity: 3, linePrice: 45 }, 
      { name: 'Burger', price: 10, quantity: 2, linePrice: 20 },
      { name: 'Soda', price: 2, quantity: 3, linePrice: 6 }
    ];
    this.recalculateCart(); 
  }

  recalculateCart() {
    this.subtotal = this.products.reduce((acc, product) => acc + product.linePrice, 0);
    this.tax = this.subtotal * this.taxRate;
    this.shipping = (this.subtotal > 0 ? this.shippingRate : 0);
    this.total = this.subtotal + this.tax + this.shipping;
  }

  updateQuantity(product: Product, quantity: number) {
    product.linePrice = product.price * quantity;
    this.recalculateCart();
  }

  removeItem(product: Product) {
    this.products = this.products.filter(p => p !== product);
    this.recalculateCart();
  }

  isCartEmpty(): boolean {
    return this.products.length === 0;
  }
}
