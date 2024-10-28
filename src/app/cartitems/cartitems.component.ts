import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import localeIn from '@angular/common/locales/en-IN';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { PayloadService } from '../service/payload.service';
declare var Razorpay: any;

registerLocaleData(localeIn, 'en-IN');

// Updated CartItem interface
interface CartItem {
  cartID: number; // Ensure this matches the API response
  name: string;
  price: number;
  quantity: number;
  linePrice: number;
  image: string;
  discount: number; // Added discount property
  userId: number;  // Add userId here
  restaurantId: number;
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
  cart: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  shipping: number = 0;
  total: number = 0;
  userId: number | null = null; // Initialize to null
  restaurantId: number = 0;

  constructor(
    private cartservice: CartService, 
    private fb: FormBuilder,
    private orderserivce: OrderService, 
    private router: Router, 
    private payloadService: PayloadService
  ) {
    this.setUserId();
    this.loadCartDetails();
  }

  payNow(): void {
    // Ensure Razorpay is loaded
    if (!Razorpay) {
      console.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      description: 'Sample Razorpay Payment',
      currency: 'INR',
      amount: this.total * 100, // Amount in paise (5000 paise = 50 INR)
      name: 'Ganesh',
      key: 'rzp_test_X0gHMV5GaFOxBX',
      prefill: {
        name: 'Sai Kumar',
        email: 'sai@gmail.com',
        phone: '7013373120',
      },
      theme: {
        color: '#2731e6'
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal dismissed");
        }
      }
    };

    const successCallback = (paymentId: string): void => {
      console.log("Payment successful, ID:", paymentId);
      alert(`Payment successful! Your payment ID is: ${paymentId}`);
      // You can add further logic here, like sending the payment ID to your server
    };

    const failureCallback = (error: any): void => {
      console.error("Payment failed:", error);
      alert(`Payment failed! Error: ${error.description}`);
      // Handle the error accordingly, like showing an error message to the user
    };

    try {
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.on('payment.failed', failureCallback);
      razorpayInstance.on('payment.success', successCallback);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  }

  private loadCartDetails() {
    this.cartservice.getCartDetails().subscribe((result) => {
      console.log('Cart items:', result); // Log the result to inspect
      this.cart = result.map(item => ({
        ...item,
        linePrice: (item.price - item.discount) * item.quantity // Calculate linePrice with discount
      }));
      this.recalculateCart(); // Recalculate cart totals after loading
      this.restaurantId = this.cart[0].restaurantId;
      console.log(this.cart[0].userId, this.restaurantId);
    });
  }

  private setUserId(): void {
    const userId = this.payloadService.getUserId();
    
    if (userId) {
      this.userId = Number(userId); // Set the userId if found
    } else {
      // Redirect to login if no userId found
      alert('You need to log in.');
      this.router.navigate(['/app-login']);
    }
  }

  recalculateCart() {
    this.subtotal = this.cart.reduce((acc, item) => acc + item.linePrice, 0);
    this.tax = this.subtotal * this.taxRate;
    this.shipping = (this.subtotal > 0 ? this.shippingRate : 0);
    this.total = this.subtotal + this.tax + this.shipping;
  }

  updateQuantity(item: CartItem, quantity: number) {
    item.quantity = quantity; // Update quantity field
    item.linePrice = (item.price - item.discount) * quantity; // Adjust line price with discount
    this.recalculateCart();
  }

  removeItem(item: CartItem) {
    this.cart = this.cart.filter(cartItem => cartItem !== item);

    // Use item.cartID to pass the CartID
    this.cartservice.deleteCartDetails(item.cartID).subscribe(
      response => {
        console.log('Cart details deleted successfully:', response);
        alert('Cart details deleted successfully!');
      },
      (error) => {
        // Error callback
        console.error('Error deleting Cart details:', error);
        alert('An error occurred while deleting Cart details. Please try again.');
      }
    );

    this.recalculateCart();
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item, item.quantity);
    }
  }

  incrementQuantity(item: CartItem) {
    item.quantity++;
    this.updateQuantity(item, item.quantity);
  }

  isCartEmpty(): boolean {
    return this.cart.length === 0;
  }

  onCheckout() {
    this.payNow();
    const orderData = {
      orderID: 0, 
      userID: this.userId, 
      restaurantID: this.restaurantId, 
      orderDate: new Date().toISOString(), 
      totalAmount: this.total, 
      orderStatus: 'Delivered', 
      paymentStatus: 'Success', 
      deliveryAddress: "user delivery address", 
      deliveryDate: new Date().toISOString(), 
      createdDate: new Date().toISOString() 
    };

    this.orderserivce.placeOrder(orderData).subscribe({
      next: (result) => {
        //alert('Order placed successfully:');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('There was an error placing your order. Please try again.');
      }
    });
  }
}
