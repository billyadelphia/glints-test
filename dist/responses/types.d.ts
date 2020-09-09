export interface Restaurant {
    id: number;
    cashBalance: string;
    restaurantName: string;
}
export interface Data {
    restaurants: Restaurant[];
}
export interface Meta {
}
export interface SuccessResponse {
    data: any;
    meta: any;
    status: number;
}
