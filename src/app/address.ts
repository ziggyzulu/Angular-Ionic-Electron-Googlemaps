export interface Address {
    description?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode?: string;
    addressId?: string; //Unique ID set in pinpoint
    placeId?: string; //Unique ID from Google
    addressStatus?: 'GEOCODED' | 'PROVISIONED'; //Status set in backend API
    latitude?: string;
    longitude?: string;
}
