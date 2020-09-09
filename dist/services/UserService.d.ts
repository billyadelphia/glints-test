import { ListParamUser, ListParamTotalUser } from "../controllers/types";
import User from "../models/User";
export default class UserService {
    list(listParamUser: ListParamUser): Promise<User[]>;
    totalUser(listParamTotalUser: ListParamTotalUser): Promise<number>;
}
