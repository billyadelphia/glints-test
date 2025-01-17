import { BuyParam } from "./types";
import TransactionService from "../services/TransactionService";
export default class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    buy(listParam: BuyParam): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
}
