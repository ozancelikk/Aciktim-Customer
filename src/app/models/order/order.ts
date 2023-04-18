export interface Order{
    id:string;
    customerId:string;
    menu:[];
    restaurantId:string;
    firstName:string;
    lastName:string
    orderDescription:string;
    orderStatus:string;
    estimatedTime:string;
}