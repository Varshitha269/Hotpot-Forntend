export interface MenuItem {
    menuItemID: number;
    menuID: number;
    itemName: string;
    description: string;
    category: string;
    price: number;
    specialDietaryInfo: string;
    tasteInfo: string;
    nutritionalInfo: string;
    availabilityTime: string;
    isInStock: boolean;
    imageUrl: string;
    isAvailable: boolean;
    discounts: number;
    createdDate: string;
    toggle: boolean;
    soldCount?: number;
  }
  export interface Rating {
    feedbackRatingID: number;
    userID: number;
    restaurantID: number;
    message: string;
    rating: number;
    createdDate: string;
  }
  export interface Restaurant {
    restaurantID: number;
    name: string;
    description: string;
    phNo: string;
    email: string;
    operatingHours: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    createdDate: string;
    isActive: boolean;
  }
  export interface CombinedData {
    restaurant: Restaurant;
    menuItems: MenuItem[];
    ratings: Rating[];
  }
  export interface Menu{
  menuItems: any;
  menuID: number;            
  restaurantID: number;      
  menuName: string;          
  description: string;       
  createdDate: string;       
  isActive: boolean;   
   

  }

  export interface Category {
    id: number;
    name: string;
    items: MenuItem[];
  }


  export interface RestaurantwithMenuItems {
    restaurantID: number;
    name: string;
    restaurantDescription: string;
    phNo: string;
    email: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    menuItemID: number;
    itemName: string;
    menuItemDescription: string;
    category: string;
    price: number;
    specialDietaryInfo: string;
    tasteInfo: string;
    nutritionalInfo: string;
    availabilityTime: string;
    imageURL: string;
    averageRating: number;
  }

  export interface Cart {
    cartID: number;         
    userID: number;         
    menuItemID: number;     
    quantity: number;       
    price: number;          
    createdDate: Date;      
}


export interface User {
  userID: number;
  username: string;
  email: string;
  password: string; // if needed, although sensitive info should generally be avoided
  phNo: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  role: string; // e.g., "Customer", "Restaurant", "Admin"
  createdDate: string;
  isActive: boolean;
  orderCount?: number; // Optional: could be used for regular users
}

export interface OrderStatisticsReport {  
  received: number;  
  delivered: number;  
  cancelled: number;  
  processing: number;  
}  

export interface RestaurantStatisticsReport {  
  activeRestaurants: number;  
  inactiveRestaurants: number;  
}  

export interface UserStatisticsReport {  
  activeUsers: number;  
  inactiveUsers: number;  
}  

export interface MenuStatisticsReport {  
  activeMenus: number;  
  inactiveMenus: number;  
}  

export interface PaymentStatisticsReport {  
  completedPayments: number;  
  failedPayments: number;
  pendingPayments:number;  
  totalEarnings: number;
}  

export interface Revenue {  
  date: string; // Use string to avoid Date serialization issues in JSON  
  revenue: number;  
}  

export interface RevenueReport {  
  [date: string]: number; // Dictionary representation where key is date and value is revenue  
}  
