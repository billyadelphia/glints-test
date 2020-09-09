import { BuyParam } from "../controllers/types";
import UserPurchaseHistory from "../models/UserPurchaseHistory";
export default class TransactionService {
    buy(param: BuyParam): Promise<UserPurchaseHistory>;
}
