import { Req } from "@tsed/common";
import { ListParamUser, ListParamTotalUser } from "./types";
import UserService from "../services/UserService";
export default class UserController {
    private readonly userService;
    constructor(userService: UserService);
    list(req: Req, listParam: ListParamUser): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
    total(req: Req, listParam: ListParamTotalUser): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
}
