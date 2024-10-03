export interface User {
    userID: number;
    username: string;
    email?: string;
    password: string;
    phNo?: string;
    addressLine?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    role: string;
    createdDate?: Date;
    isActive?: boolean;
  }
  