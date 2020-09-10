import { ListParamUser, ListParamTotalUser } from "./types";
import UserService from "../services/UserService";
export default class UserController {
    private readonly userService;
    constructor(userService: UserService);
    list(listParam: ListParamUser): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
    total(listParam: ListParamTotalUser): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
}
