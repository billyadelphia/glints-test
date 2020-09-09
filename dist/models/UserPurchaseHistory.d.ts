import { Model } from "sequelize-typescript";
declare class UserPurchaseHistory extends Model<UserPurchaseHistory> {
    id: number;
    userId: number;
    transactionAmount: number;
    dishName: string;
    restaurantName: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const userPurchaseHistoryModel: typeof UserPurchaseHistory;
export default UserPurchaseHistory;
