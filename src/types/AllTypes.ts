export interface TBike {
  name: string;
  description: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  isAvailable: boolean;
}

export interface TBikeState {
  bikes: TBike[];
}

export interface TBookingRental {
  bikeId: string;
  startTime: Date;
}

export interface TBooking {
  userId: string;
  bikeId: string;
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned?: boolean;
}

export interface TGenericSuccessfulResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface TPaymentIntentParams {
  amount: number;
  currency: string;
}

export interface TCartData {
  bikeId: string;
  bikeName: string;
  pricePerHour: number;
}

export interface TCartState {
  carts: TCartData[];
}

export interface TFilterData {
  filter_name: string;
  filter_value: string | number | boolean;
  filter_quantity: number;
  filter_checked: boolean;
}

export interface TFilterState {
  filters: TFilterData[];
}

export interface TSearchData {
  field: string;
}
