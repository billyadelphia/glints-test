import { Model } from "sequelize-typescript";
import UserPurchaseHistory from "./UserPurchaseHistory";
declare class User extends Model<User> {
    id: number;
    cashBalance: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    purchaseHistories: UserPurchaseHistory[];
}
export declare const userModel: typeof User;
export default User;
