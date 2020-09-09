export interface ListParam {
    byTime: {
        day: number;
        open: {
            from: string;
            to: string;
        };
        closed: {
            from: string;
            to: string;
        };
    };
    byHours: {
        operator: ">" | "<";
        hours: number;
        by: "day" | "week";
    };
    byDishes: {
        price: {
            from: number;
            to: number;
        };
        operator: ">" | "<";
        number: number;
    };
    byName: {
        restaurantName: string;
        dishesName: string;
    };
}
export interface ListParamUser {
    byTotalTransaction: {
        date: {
            from: string;
            to: string;
        };
        limit: number;
    };
}
export interface PopularRestaurantParam {
    by: "numberOfTransaction" | "dolarValue";
}
export interface ListParamTotalUser {
    date: {
        from: string;
        to: string;
    };
    operator: ">" | "<";
    valueOfTransaction: number;
}
export interface BuyParam {
    userId: number;
    menuId: number;
    restaurantId: number;
}
