export interface Order {
    orderID: number;
    userID: number;
    restaurantID: number;
    orderDate: Date;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    deliveryAddress: string;
    deliveryDate?: Date;
    createdDate?: Date;
    // No need for navigation properties (e.g. Restaurant, User) in Angular models unless required by frontend
  }
  