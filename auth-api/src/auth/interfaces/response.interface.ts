import User from "src/users/entity/user.entity";

export interface UserLoggedResponse  {
    accessToken:string;
    type:string;
    user:User

}