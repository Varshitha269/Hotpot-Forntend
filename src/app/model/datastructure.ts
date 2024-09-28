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